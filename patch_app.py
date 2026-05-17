with open("src/App.jsx", "r", encoding="utf-8") as f:
    code = f.read()

# پرانا پورا ریٹرن بلاک تلاش کرکے اسے بالکل کلین اور درست کنڈیشن کے ساتھ اوور رائٹ کریں
old_render = '''  return (
    <div className="max-w-md mx-auto h-screen bg-[#FFFDF9] flex flex-col overflow-hidden relative shadow-2xl">'''

new_render = '''  return (
    <div className="max-w-md mx-auto h-screen bg-[#FFFDF9] flex flex-col overflow-hidden relative shadow-2xl">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onAction={handleSidebarAction} />

      {selectedProfile && (
        <ProfileDetailModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
          onStartChat={() => { setActiveTab('chat'); setSelectedProfile(null); }}
        />
      )}

      {/* 👑 ہیڈر صرف اور صرف مین ویو کے ہوم پیج پر نظر آئے گا */}
      {currentView === 'main' && activeTab === 'home' && (
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} toggleSidebar={() => setIsSidebarOpen(true)} />
      )}'''

# پرانے مینوئل کچرے اور کنڈیشنز کو صاف کرتے ہوئے نیا سٹرکچر سیٹ کرنا
if "return (" in code:
    # پہلے سے موجود ٹوٹی ہوئی یا پرانی ہیڈر کنڈیشنز کو ہٹانا
    import re
    code = re.sub(r'\{currentView === '\''main'\'' && activeTab !== '\''chat'\'' && \(\s*\)\}', '', code)
    code = re.sub(r'<Sidebar[^>]*>', '', code)
    code = re.sub(r'\{selectedProfile && \([\s\S]*?\)\}', '', code)
    code = re.sub(r'\{currentView === '\''main'\'' && activeTab === '\''home'\'' && \([\s\S]*?\)\}', '', code)
    
    # اب مین ریٹرن کے نیچے نیا صاف ستھرا بلاک انجیکٹ کرنا
    code = code.replace(old_render, new_render)

with open("src/App.jsx", "w", encoding="utf-8") as f:
    f.write(code)
