import re

# 1. App.jsx کو اپڈیٹ کریں تاکہ مین کنٹینر پر یہ امیج لگ جائے
with open("src/App.jsx", "r", encoding="utf-8") as f:
    app_code = f.read()

# مین کنٹینر کی کلاس بدلیں اور ان لائن اسٹائل کے ذریعے بیک گراؤنڈ امیج سیٹ کریں
old_div = '<div className="max-w-md mx-auto h-screen bg-[#FFFDF9] flex flex-col overflow-hidden relative shadow-2xl">'
new_div = '<div className="max-w-md mx-auto h-screen flex flex-col overflow-hidden relative shadow-2xl" style={{ backgroundImage: "url(/images/BkG.png)", backgroundSize: "cover", backgroundPosition: "center" }}>'

if old_div in app_code:
    app_code = app_code.replace(old_div, new_div)
    with open("src/App.jsx", "w", encoding="utf-8") as f:
        f.write(app_code)
    print("✅ App.jsx پر مینوئل تصویر لاگو ہو گئی۔")

# 2. Home.jsx سے فرشی پیٹرن اور رنگ صاف کریں تاکہ نیچے والی مین امیج نمایاں ہو
with open("src/pages/Home.jsx", "r", encoding="utf-8") as f:
    home_code = f.read()

# ہوم پیج کے مین کنٹینر کو ٹرانسپیرنٹ (bg-transparent) کریں اور پرانا SVG پیٹرن ہٹائیں
home_code = re.sub(r'className="flex flex-col gap-8 pb-28 pt-8 w-full min-h-screen text-right bg-\[#F3E6D3\]" style=\{\{backgroundImage: `url\("data:image/svg\+xml.*?"\)`\}\}', 'className="flex flex-col gap-8 pb-28 pt-8 w-full min-h-screen text-right bg-transparent"', home_code)
# اگر سادہ bg-[#F3E6D3] بھی ہو تو اسے بھی ٹرانسپیرنٹ کریں
home_code = home_code.replace('bg-[#F3E6D3]', 'bg-transparent')

with open("src/pages/Home.jsx", "w", encoding="utf-8") as f:
    f.write(home_code)
print("✅ Home.jsx کا پرانا پیٹرن صاف کر کے ٹرانسپیرنٹ کر دیا گیا۔")

