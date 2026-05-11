#!/bin/bash
echo "🛡️ ایماندار ڈیٹیکٹر ایکٹیو ہو چکا ہے... بگز پر نظر ہے!"
last_check=""

while true; do
  # src فولڈر میں آخری تبدیل ہونے والی فائل کا وقت چیک کریں
  current_check=$(find src -type f -exec stat -c %Y {} + 2>/dev/null | sort -n | tail -1)
  
  if [ "$current_check" != "$last_check" ]; then
    if [ ! -z "$last_check" ]; then
      clear
      echo "⚡ فائل میں تبدیلی محسوس کی گئی۔ اسکیننگ جاری ہے..."
      
      # بغیر بلڈ کیے صرف سنٹیکس اور بگز چیک کریں (انتہائی ہلکا پروسیس)
      npx eslint "src/**/*.{js,jsx}" --quiet
      
      if [ $? -eq 0 ]; then
        echo "✅ زبردست! کوڈ بالکل صاف ہے، کوئی خرابی نہیں ملی۔"
      else
        echo "❌ خرابی مل گئی ہے! اوپر دیے گئے لاگ کو چیک کریں۔"
      fi
    fi
    last_check=$current_check
  fi
  sleep 1 # ہر ایک سیکنڈ بعد ہلکا سا چیک کرے گا (بیٹری فرینڈلی)
done
