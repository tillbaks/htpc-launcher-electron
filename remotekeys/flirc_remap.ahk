#SingleInstance, force
SetTitleMatchMode 2

GroupAdd, apps, ahk_class Kodi
GroupAdd, apps, Twitch - Brave
GroupAdd, apps, YouTube on TV - Brave
GroupAdd, apps, ahk_exe steam.exe
GroupAdd, apps, ahk_exe retroarch.exe
GroupAdd, apps, ahk_exe brave.exe
GroupAdd, apps, HTPC Launcher

#IfWinActive ahk_class Kodi
^!F1::Send s
^!F3::Send i
^!F4::Send c
Escape::Send {BackSpace}

#IfWinActive Twitch - Brave
Up::Send f
Down::Send !t

#IfWinActive YouTube on TV - Brave
Escape::Send {Escape}

#IfWinActive ahk_exe brave.exe
Escape::Send !{Left}

; If no HTPC apps are the active when pressing these keys
; it will activate the first open window in the group
#IfWinNotActive, ahk_group apps
Escape::GroupActivate, apps
^!F1::GroupActivate, apps

#IfWinNotActive HTPC Launcher
^!F1::Send !{F4}

Return