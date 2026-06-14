export const getFriendlyErrorMessage = (error) => {
  // التأكد من وجود كود الخطأ الخاص بـ Firebase
  const errorCode = error?.code || error?.message;

  switch (errorCode) {
    // أخطاء الاتصال والشبكة
    case "unavailable":
      return "تعذر الاتصال بالخادم، يرجى التحقق من شبكة الإنترنت.";
    case "deadline-exceeded":
      return "استغرق الطلب وقتاً أطول من المعتاد، يرجى المحاولة مجدداً.";

    // أخطاء الصلاحيات وقواعد البيانات
    case "permission-denied":
      return "عذراً، ليس لديك الصلاحية للوصول إلى هذه البيانات.";
    case "not-found":
      return "البيانات التي تبحث عنها غير موجودة.";

    // أخطاء الحسابات والمصادقة (إذا كنت تستخدم Firebase Auth)
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "البريد الإلكتروني أو كلمة المرور غير صحيحة.";
    case "auth/email-already-in-use":
      return "هذا البريد الإلكتروني مسجل بالفعل لدينا.";
    case "auth/network-request-failed":
      return "فشل الاتصال بالشبكة، تحقق من الإنترنت لديك.";

    // خطأ عام غير متوقع
    default:
      return "حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى لاحقاً.";
  }
};
