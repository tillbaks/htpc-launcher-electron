SetTitleMatchMode 2

^!F1::
    if !WinActive("HTPC Launcher")
        Send !{F4}
return

$Up::
    if WinActive("Twitch - Brave")
        Send f
    else
        Send {Up}
return

$Down::
    if WinActive("Twitch - Brave")
        Send !t
    else
        Send {Down}
return

$Escape::
    if WinActive("YouTube on TV - Brave")
        Send {Escape}
    else if WinActive("ahk_exe brave.exe")
        Send !{Left}
    else if WinActive("ahk_class Kodi")
        Send {BackSpace}
    else
        Send {Escape}
return