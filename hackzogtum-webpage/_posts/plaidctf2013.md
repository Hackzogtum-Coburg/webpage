---
title: "PlaidCTF2013"
date: "2013-04-25"
coverImage: '/images/placeholder.jpg'
---

Am letzten Wochenende 19. - 21.04.2013  fand die [PlaidCTF2013](http://plaidctf.com/%29) - eine der größten und bekanntesten Hackingchallenges - statt. Das Team des [backspace Bamberg](http://www.hackerspace-bamberg.de/Hauptseite%29) hat dabei Platz 37 von ca. 900 belegt, wofür ich hier erst einmal einen großen Glückwunsch loswerden möchte: well played oder fränkisch: "ned schlechd".

Warum erzähle ich das Ganze? Nun ja ich hatte die Ehre für ein paar Stunden als Gast teilzunehmen und Mischa, der wohl auch bei uns mitmischen wird, ist quasi für 3 Tage bei backspace eingezogen. Für mich gab es zwei große Lehren die ich ziehen konnte: a) "Noch viel zu lernen Du hast"  -> Es wird also Zeit, dass wir ihn Coburg was hochziehen. b) "Es macht unglaublich viel Spass" -> Folgerung analog.

Um was geht's denn überhaupt?

Eine Security CTF (CTF = capture the flag, [http://ctftime.org/ctf-wtf/](http://ctftime.org/ctf-wtf/%29)[)](http://ctftime.org/ctf-wtf/%29) ist ein Spiel bei dem man Flags ergattern muss, die man sich durch aktives Hacken verdient. Je nach Komplexität der Aufgabe erhält man für ein Flag mehr oder weniger Punkte. Dabei treten mehrere Teams gegeneinander an und wer am Ende die meisten Punkte hat, gewinnt. Gehackt wird natürlich nicht im offenen Netz sondern auf dafür vorbereiteten Servern die extra für das Spiel angelegt sind und auch für die entsprechenden Aufgaben vorbereitet sind. Teilweise erhält man auch Programme, für die man einen Exploit finden muss, um an das begehrte Flag zu kommen. Die Schwachstellen sind dabei meist extra eingebaut, orientieren sich aber an echten Szenarien. Die Schwerpunkte sind also:

1.) Herausfinden, womit man es zu tun hat

2.) Schwachstellen finden

3.) Exploit basteln

Beispiele:

Man erhält ein Programm, das einem das Flag einfach so ausgibt - allerdings ist es künstlich so programmiert, dass es Tage lang laufen würde, bevor es das tut. Um dies zu lösen musste der Maschinencode des Programms per Hand manipuliert werden, um die unnötigen Teile des Programs zu überspringen.

Man erhält den Mitschnitt einer USB-Schnittstelle; Mit viel Geduld stellt man fest, dass darin eine Firmware auf einen Chip installiert wird. 2 Teammitglieder aus München haben daraufhin diese Firmware extrahiert, auf einen echten Chip übetragen, festgestellt, dass sie diesen noch etwas umlöten müssen, um dann zu erkennen, was das Ganze eigentlich tut.

Man erhält ein Program und den Hinweis, es könne mit Hilfe von ROP (Return oriented Programming) exploited werden. Nach 16-stündigem Studium einschlägiger Papers konnte eines der Teammitglieder einen Exploit schreiben.

Man erhält ein ausführbares Programm. Mangels meiner Erfahrung konnte ich allerdings nicht feststellen, dass dieses durch das Ein- und Ausschalten der Capslock-Taste einen Morsecode mit der Kontroll-LED der Tastatur blinken lässt, den man hätte auslesen müssen.

Bei Interesse an Details, sollte man mit ein wenig Googlen detaillierte Write-Ups (Lösungen) von verschiedenen Teams finden. Oder einfach hier schauen: [http://ctftime.org/event/64/tasks/](http://ctftime.org/event/64/tasks/)

Wer Interesse hat, sich selbst darin zu üben, für den gibt es auch Internetseiten die permanent Challenges anbieten und die einen Schritt für Schritt die Grundlagen und verschiedene Techniken beibringen.

Beispiele sind:

[http://www.overthewire.org/wargames/](http://www.overthewire.org/wargames/)

[http://smashthestack.org/](http://smashthestack.org/)

Hier finden sich verschiedene "Wargames" zu verschiedenen Themenbereichen. Statt Flags erhält man hier als Lösung immer das Passwort für das nächst-schwierigere Level.

Viel Spass - aber Vorsicht Suchtgefahr!!!

legion
