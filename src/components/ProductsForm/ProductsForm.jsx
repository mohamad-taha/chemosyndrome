// ====================
// Imports
// ====================

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { fetchProduct, addProduct, updateProduct } from "../../service/api";
import FormInput from "../FormInputs/FormInput";
import "./ProductsForm.css";

// ====================
// Supabase Client Setup
// ====================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// ====================
// Component: ProductsForm
// ====================

const ProductsForm = ({ user }) => {
  const { id } = useParams();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const [item, setItem] = useState({
    name: "",
    capacity: "",
    price: "",
    image: null,
    imageUrl: null,
    type: "",
  });

  // ====================
  // Load product for edit mode
  // ====================

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      try {
        const data = await fetchProduct(id);

        if (!data) {
        await  Swal.fire({
            icon: "error",
            title: "المنتج غير موجود",
            confirmButtonColor: "#d00000",
            confirmButtonText: "حسناً",
          });
          navigate("/");
          return;
        }

        setItem({
          name: data.title ?? "",
          capacity: data.capacity ?? "",
          price: data.price ?? "",
          image: null,
          imageUrl: data.imageUrl ?? null,
          type: data.type ?? "",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "خطأ بجلب المنتج",
        });
        navigate("/");
      }
    };

    load();
  }, [id]);

  // ====================
  // Upload image to Supabase
  // ====================

  const uploadImageIfNeeded = async () => {
    if (!item.image) return item.imageUrl ?? null;

    const bucketName = "product-images";
    const cleanFileName = item.image.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const fileName = `${Date.now()}_${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, item.image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    return data?.publicUrl ?? null;
  };

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      Swal.fire({
        icon: "success",
        title: "تم إضافة المنتج",
        confirmButtonColor: "#4977e5",
        confirmButtonText: "حسناً",
      });
      navigate("/products");
    },
    onError: (error) => {
      console.error("خطأ في إضافة المنتج:", error);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: ({ id, updates }) => updateProduct(id, updates),
    onSuccess: (_, variables) => {
      const { id, updates } = variables;
      const prevProducts = qc.getQueryData(["products"]);

      if (prevProducts) {
        qc.setQueryData(
          ["products"],
          prevProducts.map((p) => (p.id === id ? { ...p, ...updates } : p))
        );
      }

      qc.setQueryData(["product", id], (old) => ({
        ...(old ?? {}),
        ...updates,
      }));

      Swal.fire({
        icon: "success",
        title: "تم تحديث المنتج",
        confirmButtonColor: "#4977e5",
        confirmButtonText: "حسناً",
      });
      navigate("/products");
    },
    onError: (error) => {
      console.error("خطأ في تحديث المنتج:", error);
    },
  });


  // ====================
  // Submit handler (add / update product)
  // ====================

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    if (!item.name || !item.capacity || !item.price || !item.type) {
      return Swal.fire({
        title: "الرجاء إدخال جميع الحقول المطلوبة",
        icon: "info",
        confirmButtonText: "حسناً",
        confirmButtonColor: "#4977e5",
      });
    }

    try {
      const imageUrl = await uploadImageIfNeeded();

      const productData = {
        title: item.name,
        price: item.price,
        capacity: item.capacity,
        imageUrl,
        type: item.type,
      };

      if (id) {
        await updateProductMutation.mutateAsync({ id, updates: productData });
      } else {
        await addProductMutation.mutateAsync(productData);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "حدث خطأ أثناء الحفظ",
        confirmButtonColor: "#d00000",
        confirmButtonText: "حسناً",
      });
    }
    setIsSaving(false);
  };

  return (
    <div className="formContainer">
      <title>
        {id
          ? "ENVOKEM BEAUTY | تعديل المنتج"
          : "ENVOKEM BEAUTY | إضافة منتج جديد"}
      </title>

      <div>
        <h3>{id ? "تعديل المنتج" : "إضافة منتج جديد"}</h3>

        <form onSubmit={handleSubmit}>
          <FormInput
            label="اسم المنتج"
            name="productName"
            type="text"
            id="productName"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            placeholder="مثال: شامبو هامول"
          />

          <FormInput
            label="سعر المنتج"
            name="productPrice"
            type="number"
            id="productPrice"
            value={item.price}
            onChange={(e) =>
              setItem({
                ...item,
                price: parseFloat(e.target.value) || 0,
              })
            }
            placeholder="مثال: 100"
          />

          <FormInput
            label="سعة المنتج"
            name="productCapacity"
            type="text"
            id="productCapacity"
            value={item.capacity}
            onChange={(e) => setItem({ ...item, capacity: e.target.value })}
            placeholder="500مل, 1كغ ..."
          />

          <div>
            <label htmlFor="productImage">صورة المنتج</label>
            <input
              id="productImage"
              accept="image/*"
              type="file"
              onChange={(e) =>
                setItem({
                  ...item,
                  image: e.target.files?.[0] ?? null,
                })
              }
            />

            {item.imageUrl && !item.image && (
              <div style={{ marginTop: 8 }}>
                <p>الصورة الحالية:</p>
                <img
                  src={item.imageUrl}
                  alt="current"
                  style={{
                    width: 200,
                    height: 300,
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>

          <div>
            <p>نوع المنتج:</p>
            <div className="productTypeOptions">
              <label htmlFor="makeUp">مستحضرات تجميل</label>
              <input
                id="makeUp"
                type="radio"
                name="productType"
                value="مستحضرات تجميل"
                checked={item.type === "مستحضرات تجميل"}
                onChange={(e) => setItem({ ...item, type: e.target.value })}
              />

              <label htmlFor="nutritionalSupplements">مواد تنظيف</label>
              <input
                id="nutritionalSupplements"
                type="radio"
                name="productType"
                value="مواد تنظيف"
                checked={item.type === "مواد تنظيف"}
                onChange={(e) => setItem({ ...item, type: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="primaryBtn"
            aria-label={id ? "حفظ تعديلات المنتج" : "نشر المنتج الآن"}
          >
            {isSaving ? "جاري الحفظ..." : id ? "تعديل المنتج" : "إضافة منتج"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductsForm;
