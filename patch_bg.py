with open("src/App.jsx", "r", encoding="utf-8") as f:
    code = f.read()

# پرانے مینوئل کمنٹ اور ایس وی جی پیٹرن والے رینڈر فریم کو ہائی جیک کرنا
old_block = '''  return (
    /* 🏰 اب پوری ایپ کا مین فریم اس خوبصورت فرشی ڈیزائن اور لائٹ پیچ رنگ پر لاک کر دیا گیا ہے */
    <div
      className="max-w-md mx-auto h-screen flex flex-col overflow-hidden relative shadow-2xl bg-[#F3E6D3]"
      style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M0 0h30v30H0zm30 30h30v30H30z' fill='%23D4AF37' fill-opacity='0.04'/%3E%3C/svg%3E")`}}
    >'''

# اس کی جگہ نیا کلین فریم لانا جو کہ پبلک فولڈر سے براہِ راست BkG.png کو سینٹر کور پوزیشن میں لائے گا
new_block = '''  return (
    <div
      className="max-w-md mx-auto h-screen flex flex-col overflow-hidden relative shadow-2xl bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/BkG.png')" }}
    >'''

if old_block in code:
    code = code.replace(old_block, new_block)
else:
    # بیک اپ فالس سیف ریپلیسمنٹ (اگر کمنٹ یا ان لائن کلاسز میں کوئی مائنر فرق ہو)
    import re
    code = re.sub(r'<div\s+className="max-w-md mx-auto h-screen flex flex-col overflow-hidden relative shadow-2xl[^"]*"\s+style=\{\{[\s\S]*?\}\}\s*>', 
                  '<div className="max-w-md mx-auto h-screen flex flex-col overflow-hidden relative shadow-2xl bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(\'/images/BkG.png\')" }}>', 
                  code)

with open("src/App.jsx", "w", encoding="utf-8") as f:
    f.write(code)
