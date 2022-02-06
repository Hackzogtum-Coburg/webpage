---
title: "Haskell Workshop - Terminumfrage Teil 2"
date: "2020-02-11"
coverImage: '/images/Auswahl_020.png'
---

![](../images/Auswahl_020.png)

**Die Terminumfrage für den zweiten Teil findet sich unter:**  
[\--> Terminumfrage <--](https://oc.electrologic.org/apps/polls/s/6nTOiHZBCjZAQmBp)

Im zweiten Teil soll Teil 1 reflektiert, diskutiert und offene Fragen geklärt werden. Danach geht es weiter auf dem Weg zum Sudoku-Solver

**Teaser:**

Heutzutage lassen sich fast alle "großen" Programmiersprachen in die Klasse der objektorientierten Sprachen einordnen. Viele Jahre galt das Objektorientierte Paradigma im Mainstream als alternativlos und neue Programmiersprachen grenzten sich durch subtile Unterschiede und etwas andere Syntax voneinander ab. In den letzten Jahren jedoch tauchen neue "seltsame" Konstrukte wie Lambda-Funktionen, unendliche Streams und viele mehr auf. Auch die Typsysteme verändern sich wie bspw. die sog. Concepts im C++20 zeigen. Diese Änderungen haben ihren Ursprung in der Funktionalen Programmierung. Haskell als eine Vertreterin dieser Gattung geht dabei wenig Kompromisse ein und eignet sich daher hervorragend sich diese Konzepte in ihrer reinen Form anzuschauen. Neben einem besseren Verständnis über diese Konzepte und warum sich diese in so vielen Sprachen wiederfinden, wird durch ihre Anwendung auch ein anderer Blickwinkel auf zu lösende Probleme eröffnet.  

Die erste Einheit des Workshops wird sich vor den ersten Gehversuchen mit Haskell, zunächst mit dem der Funktionalen Programmierung zugrundeliegenden Lambda Kalkül befassen. Das Lambda Kalkül ist ein Berechnungsmodell vergleichbar mit der weithin bekannten Turing Maschine.

Nach dieser kurzen theoretischen Einführung bringen wir die Programmierumgebung bestehend aus einem Texteditor und der interaktiven Haskell Shell (ghci) an den Start. Als Übungsobjekt wollen wir einen Sudoku Puzzle Generator bauen und dabei ausschließlich "purly functional" bleiben. In anderen Worten, wir werden unsere Funktionen wie mathematische Funktionen begreifen, deren Ergebnis nur von ihren Eingabeparametern abhängt.

Der angestrebte Sudoku Generator wird aus drei Teilen bestehen:

1. Ein Psudozufallszahlengenerator um unterschiedliche Puzzles erstellen zu können
2. Ein simpler Algorithmus um vollständig ausgefüllte Puzzles zu erstellen
3. Ein vereinfachter Algorithmus um Werte aus dem Puzzle zu entfernen

Unglücklicherweise sorgen die Vereinfachungen dafür, dass die Puzzles vorhersehbar werden und am Ende unter Umständen mehr als eine Lösung möglich ist, was um genau zu sein dann kein gültiges Sudoku mehr ist. Diese Probleme sollen in einer weiteren Session behoben werden.

Sake vom Hackzogtum Coburg:

  
_"Der Plan für den Workshop sieht so aus, dass wir mit einer kurzen Einführung in Funktionale Programmierung starten und dabei das Lambda Kalkül und etwas Typ Theorie anschauen. Danach probieren wir uns an einfachen purely functional Programmen. Das sollte den Abend ganz gut füllen.  
Als Werkzeuge brauchen wir für diesen Termin lediglich den Glasgow Haskell Compiler (_[_https://www.haskell.org/ghc/_](https://www.haskell.org/ghc/)_) und einen Texteditor mit Syntax Highlighting (_[_https://wiki.haskell.org/Editors_](https://wiki.haskell.org/Editors)_). GHC läuft auch unter Windows allerdings hab ich da null Erfahrung ob das anständig funktioniert. Also bitte im Vorfeld schauen, dass das Setup was sinnvolles macht. Die Doku Seite könnte da helfen._ [_https://downloads.haskell.org/ghc/latest/docs/html/users\_guide/win32-dlls.html_](https://downloads.haskell.org/ghc/latest/docs/html/users_guide/win32-dlls.html)_  
Alternativ einfach ein Ubuntu in WSL installieren und ghc über den package manager installieren."_

  
(Anm d. Redaktion: Wir wissen auch nicht, wie er es schafft mit funktionierenden Links zu sprechen)
