import re

files_to_fix = {
    "src/pages/Home.jsx": [
        (r'bg-\[#FFFDF9\]', 'bg-transparent'),
        (r'bg-white', 'bg-transparent')
    ],
    "src/pages/Discover.jsx": [
        (r'bg-\[#FDF5F5\]', 'bg-transparent')
    ],
    "src/pages/Chat.jsx": [
        (r'bg-\[#FFFDF9\]', 'bg-transparent'),
        (r'bg-\[#F5E6D3\]/10', 'bg-[#F5E6D3]/20') # چیٹ ببل ایریا کو ہلکا سا پرامنٹ رکھنے کے لیے
    ],
    "src/pages/Notifications.jsx": [
        (r'bg-\[#FDF5F5\]', 'bg-transparent')
    ],
    "src/pages/About.jsx": [
        (r'bg-\[#FDF5F5\]', 'bg-transparent')
    ],
    "src/pages/HelpSupport.jsx": [
        (r'bg-\[#FDF5F5\]', 'bg-transparent')
    ],
    "src/pages/BlockedProfiles.jsx": [
        (r'bg-\[#FFFDF9\]', 'bg-transparent')
    ],
    "src/pages/ProfileManager.jsx": [
        (r'bg-\[#FFFDF9\]', 'bg-transparent')
    ],
    "src/pages/Subscription.jsx": [
        (r'bg-\[#1a0007\]', 'bg-transparent'),
        (r'bg-\[radial-gradient[^\]]*\]', 'bg-transparent'), # پریمیم پیج کا ڈارک گریڈینٹ صاف
        (r'bg-\[#2b000d\]/80', 'bg-[#4A0E0E]/90')
    ],
    "src/pages/Verification.jsx": [
        (r'bg-\[#FFFDF9\]', 'bg-transparent')
    ],
    "src/pages/PrivacySettings.jsx": [
        (r'bg-\[#FFFDF9\]', 'bg-transparent')
    ],
    "src/components/EditProfileForm.jsx": [
        (r'bg-\[#2D0A0A\]', 'bg-transparent') # فارم کا کالا بیک گراؤنڈ صاف تاکہ نیچے سے فرش دیکھے
    ]
}

for file_path, replacements in files_to_fix.items():
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original = content
        for pattern, repl in replacements:
            content = re.sub(pattern, repl, content)
            
        if content != original:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(r"✅ Fixed backgrounds in: " + file_path)
    except FileNotFoundError:
        print(r"⚠️ File not found: " + file_path)

