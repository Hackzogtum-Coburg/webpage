import Link from 'next/link'


export default function Info() {
    return (
      <div>
            <h3>Über uns</h3>     
            <div className="entry-content">
                <p>Du hast sicher einige Fragen an uns.</p> <br />

                <p><b>Was ist das Hackzogtum?</b><br />
                Der “Hackzogtum Coburg e.V.” ist ein Verein für Technikinteressierte.<br />
                Der Verein bietet eine Plattform zum Austausch von Wissen und dem gemeinsamen Arbeiten an Projekten.<br />
                Auch Öffentlichkeitsarbeit und die Förderung der Allgemeinbildung ist uns wichtig. Hierbei wollen wir allen Interessierten die Möglichkeit geben, ihr Wissen zu erweitern bzw. Ihnen den Zugang zur Technik aller Art zu erleichtern.<br />
                Zentraler Ort des Vereinslebens ist unser <a href="https://de.wikipedia.org/wiki/Hackerspace" target="_blank" rel="noreferrer">Hackspace</a> in der Heiligkreuzstr. 3 in Coburg.</p>
                <br />

                <p><b>Was ist ein Hackspace?</b><br />
                Ein <a href="https://de.wikipedia.org/wiki/Hackerspace" target="_blank" rel="noreferrer">Hackspace </a>ist ein offener Raum, in dem sich Hacker zum Austausch oder zum kreativen Umgang mit Technologien treffen. 
                Hackspaces gibt es überall auf der Welt und stehen in der Regel mit dem <a href="https://de.wikipedia.org/wiki/Chaos_Computer_Club" target="_blank" rel="noreferrer">Chaos Computer Club</a> in Verbindung.<br />
                Einen schönen <a href="http://www.spiegel.de/netzwelt/web/was-ist-eigentlich-ein-hackerspace-a-891543.html" target="_blank" rel="noreferrer">Artikel</a> hierzu liefert auch der Spiegel.</p>
                <br />

                <p><b>Ihr seid also Hacker?</b><br />
                Ja und nein.<br />
                Das Wort “Hacker” verfügt im technischen Bereich über mehrere Bedeutungen. Umgangssprachlich ist es über die Jahre leider zu einem negativ belegten Wort geworden, das Menschen bezeichnet, 
                die meist illegal in fremde Computernetze eindringen. Wäre diese Definition gemeint, müssten wir die Frage mit einem klaren “Nein“ beantworten.<br />
                Anders kann man einen Hacker auch als Tüftler bezeichnen. Er befasst sich kreativ mit verschiedenen Technologien und erschafft mit großer Improvisationsgabe etwas Neues, wenn auch nicht unbedingt 
                zwingend etwas Sinnvolles. Im Vordergrund stehen Spass und Freude am Schaffen, das Verstehen und das Erlangen von Wissen.</p>
                <br />

                <p><b>Warum braucht man dafür einen Verein?</b><br />
                Diese Erklärung ist ganz einfach. Natürlich könnte auch jeder für sich ein lustiges Projekt in Angriff nehmen, aber gemeinsam macht es eben gleich doppelt soviel Spaß. Außerdem kann es bei größeren Projekten sein, 
                dass Teile über die eigene Expertise hinaus gehen und Hilfe und Austausch vonnöten sind. Ein weiterer wichtiger Punkt ist, dass benötigte Werkzeuge häufig zu teuer sind, um sie sich als Einzelperson für ein Hobby zu leisten.</p>
                <br />

                <p><b>Wann kann ich mitmachen?</b><br />
                Kurz: Immer!<br />
                Man muss kein Experte in einem Gebiet sein. Interesse und Lernwille allein reichen aus. Jeder, unabhängig von Geschlecht, Alter oder Ethnie ist willkommen und wir freuen uns über jedes neue Mitglied. 
                Natürlich könnt ihr uns auch gerne erstmal besuchen und mal reinschnuppern.
                {/* Ob gerade jemand da ist siehst du <a href="http://mmisc.de/~vale/SpaceOpenClosed.php">hier</a>. */}
                </p>
                <br />

                <p><b>Was muss draußen bleiben?</b><br />
                Politik, Rassismus oder Intoleranz jeder Art. Wir sind als Verein ausdrücklich keiner Partei, Religion oder Sonstigem zugehörig.<br />
                Wie in unserer <a href="/assets/Satzung_Hackzogtum_Coburg_e.V._2015-05-09.pdf" target="_blank" rel="noopener">Satzung</a> beschrieben, sind wir ein Verein für Jedermann unabhängig von 
                Alter, Geschlecht, Ethnie oder gesellschaftlicher Stellung. Wir achten jedes Wesen und dulden keine Intoleranz.<br />
                Kurz: “Be excellent to each other!”</p>
                <br />

                <p><b>Womit beschäftigt ihr euch hauptsächlich?</b><br />
                Du hast eine lustige Idee, die du im Rahmen des Vereins umsetzen möchtest? – Her Damit!<br />
                Jeder unserer Mitglieder kann eigene Vorschläge einbringen und umsetzen. Egal ob Hardware oder Software, Löten oder Coden, Basteln oder Zocken.<br />
                Das einzig Wichtige dabei ist, dass man nichts tut, das gegen die Richtlinien des Vereins verstößt oder diesem schadet.<br />
                Auch hier gilt: “Be excellent to each other!”</p>
                <br />

                <p><b>Ich habe noch mehr Fragen…</b><br />
                Super! Das ist die richtige Einstellung! Denn Fragen sind das was uns antreibt.<br />
                Wenn wir Dein Interesse geweckt haben, sei herzlich willkommen mit uns Kontakt aufzunehmen.<br />
                Einige Möglichkeiten dies zu tun, findest Du unter der Kategorie “<Link href="/kontakt">Kontakt</Link>” auf dieser Homepage.</p>
                <br />

                <p><b>Du willst Mitglied werden?</b><br />
                Schau doch einfach mal vorbei! Und wenn du die sicher bist findest du das Formular dazu <Link href="/beitritt">hier</Link>.</p>
                <br/>

                <p>Wir freuen uns!<br />
                Dein Hackzogtum Coburg</p>
            </div>
      </div>
    )
  }
