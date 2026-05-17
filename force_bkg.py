with open("src/App.jsx", "r", encoding="utf-8") as f:
    code = f.read()

# ایپ کے اندر جہاں صفحات رینڈر ہوتے ہیں، اس <main> ٹیگ کو فورسڈ کلاسز کے ساتھ اوور رائٹ کریں
old_main = '<main className="flex-1 overflow-y-auto no-scrollbar pb-20">'
new_main = '<main className="flex-1 overflow-y-auto no-scrollbar pb-20 [&>*]:!bg-transparent">'

if old_main in code:
    code = code.replace(old_main, new_main)
    print("✅ Success: Forced global background on all sub-pages!")
else:
    # اگر کلاسز تھوڑی مختلف ہوں تو ٹیل ونڈ سلیکٹر کے ساتھ ریپلیس کریں
    import re
    code = re.sub(r'<main className="([^"]+)">', r'<main className="\1 [&>*]:!bg-transparent">', code)
    print("✅ Success: Applied Tailwind structural override!")

with open("src/App.jsx", "w", encoding="utf-8") as f:
    f.write(code)
