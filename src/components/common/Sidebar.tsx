@@ .. @@
      case 'deacon':
        return [
          { id: 'dashboard', icon: HomeIcon, label: 'الرئيسية' },
          ...common,
          { id: 'lessons', icon: BookOpenIcon, label: 'الدروس' },
          { id: 'calendar', icon: CalendarIcon, label: 'التقويم' },
+          { id: 'attendance-board', icon: ClipboardDocumentCheckIcon, label: 'سجل الحضور' },
          { id: 'notifications', icon: BellIcon, label: 'الإشعارات' },
        ];