import React, { useState } from "react";
import { db } from "../../service/firebase"; // استيراد قاعدة بيانات Firebase
import { collection, addDoc } from "firebase/firestore";
import { createClient } from "@supabase/supabase-js"; // 1. استيراد سوبابيس
import { useNavigate } from "react-router-dom";
import './ProductsForm.css';

// 2. إعداد اتصال Supabase خارج المكون لمنع إعادة الإنشاء مع كل ريندر
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


const ProductsForm = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState({ name: "", capacity: "", price: "", image: null });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item.name || !item.image || !item.capacity || item.price <= 0) {
      return alert("الرجاء إدخال جميع الحقول!");
    }

    setLoading(true);
    const bucketName = "product-images"; // اسم الـ Bucket في سوبابيس
    const cleanFileName = item.image.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const fileName = `${Date.now()}_${cleanFileName}`;

    try {
      // 3. رفع الصورة باستخدام مكتبة Supabase الرسمية
      const { data: uploadData, error: uploadError } = await supabase
        .storage
        .from(bucketName)
        .upload(fileName, item.image, {
          cacheControl: '3600',
          upsert: false
        });

      // التحقق من وجود خطأ أثناء الرفع
      if (uploadError) throw uploadError;

      // 4. جلب الرابط العام المباشر للصورة من سوبابيس
      const { data: { publicUrl } } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(fileName);

      // 5. حفظ البيانات ورابط الصورة داخل Firebase Firestore
      await addDoc(collection(db, "products"), {
        title: item.name,
        price: item.price,
        capacity: item.capacity,
        imageUrl: publicUrl,
        createdAt: new Date()
      });

      alert("تم إضافة منتجك بنجاح!");
      navigate("/products"); // إعادة التوجيه إلى صفحة المنتجات بعد الإضافة
      setItem({ name: "", capacity: "", price: "", image: null });
      e.target.reset();

    } catch (error) {
      console.error("حدث خطأ أثناء العملية:", error);
      alert(`حدث خطأ: ${error.message || "فشل الرفع"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div>
        <h3>إضافة منتج جديد</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="productName">اسم المنتج:</label>
            <input
              name="productName"
              type="text"
              id="productName"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
              placeholder="مثال: شامبو هامول"
            />
          </div>
          <div>
            <label htmlFor="productPrice">سعر المنتج:</label>
            <input
              name="productPrice"
              type="number"
              id="productPrice"
              value={item.price || ""}
              onChange={(e) => setItem({ ...item, price: parseFloat(e.target.value) || 0 })}
              placeholder="مثال: 100"
            />
          </div>
          <div>
            <label htmlFor="productCapacity">سعة المنتج:</label>
            <input
              name="productCapacity"
              type="text"
              id="productCapacity"
              value={item.capacity}
              onChange={(e) => setItem({ ...item, capacity: e.target.value })}
              placeholder="500 ml, 1 kg, 20g ......"
            />
          </div>
          <div>
            <label htmlFor="productImage">صورة المنتج:</label>
            <input
              name="productImage"
              type="file"
              id="productImage"
              accept="image/*"
              onChange={(e) => setItem({ ...item, image: e.target.files[0] })}
            />
          </div>
          <button type="submit" disabled={loading} className="primaryBtn">
            {loading ? "جاري الرفع والإضافة..." : "نشر المنتج الآن"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductsForm;
