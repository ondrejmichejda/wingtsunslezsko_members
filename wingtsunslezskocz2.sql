-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Počítač: localhost
-- Vytvořeno: Úte 19. říj 2021, 19:50
-- Verze serveru: 10.4.11-MariaDB
-- Verze PHP: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `wingtsunslezskocz2`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `ex_articles`
--

CREATE TABLE `ex_articles` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `topic` int(11) NOT NULL DEFAULT 0 COMMENT '1-aktuality, 2-courses, 3-wingtsun, 4-prevention, 5-kids',
  `url` varchar(200) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `keywords` varchar(2000) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `metadesc` varchar(2000) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `name` varchar(100) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `short` varchar(500) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `pic` longtext COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `text` longtext COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `release_datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `visible` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `ex_articles`
--

INSERT INTO `ex_articles` (`id`, `datetime`, `topic`, `url`, `keywords`, `metadesc`, `name`, `short`, `pic`, `text`, `release_datetime`, `visible`) VALUES
(1, '2018-10-01 13:37:00', 3, 'Latosa-Escrima-koncept-ktery-funguje', 'escrima, zbraně, sebeobrna, kali, bojové umění', '', 'Latosa Escrima – koncept, který funguje!', 'Je známo, že Latosa Escrima, využívá k zesílení svého bojového potenciálu a efektivity prakticky jakýkoliv vhodný předmět, ať už se jedná o nůž, taktické pero, mačetu nebo obyčejný klacek či násadu od smetáku. Tyto předměty však samy o sobě nebezpečné nejsou. Funkční pro boj a sebeobranu se stávají až ve chvíli, kdy je do rukou vezme člověk.', 'uploads/ES8.jpg', '<p>Je známo, že <strong>Latosa Escrima</strong> <strong>využívá k zesílení svého bojového potenciálu a efektivity prakticky jakýkoliv vhodný předmět</strong>, ať už se jedná o nůž, taktické pero, mačetu nebo obyčejný klacek či násadu od smetáku. Tyto předměty však samy o sobě nebezpečné nejsou. Funkční pro boj a sebeobranu se stávají až ve chvíli, kdy je do rukou vezme člověk. A právě člověk, který chce dokonale využívat potenciál zbraně, <strong>musí nejdříve „vyladit“ své tělo a mysl v oblasti rovnováhy, síly, rychlosti či načasování.</strong> Latosa Escrima je konceptem, který takovéto vyladění těla a mysli bojovníka rozvíjí a zároveň umožňuje přenositelnost využívaných pohybů prakticky na jakýkoliv předmět či zbraň.</p>\r\n<p>Tento přístup zaručí, že <strong>ve chvíli emočního vypětí, strachu či paniky</strong>, kdy racionální myšlení ustupuje tomu emočnímu, a vy nejste schopni vymyslet racionální obranu, nejste schopni vzpomenou si ani na jedinou vhodnou techniku,<strong> se vaše „vyladěné“ tělo zachová správně a z problému Vás vytáhne</strong>, a pokud to bude nezbytné i za pomoci zbraně.</p>\r\n<p><strong>Jsme hrdí na to, že se toto umění dostalo i k nám do Slezska</strong> a my se jej můžeme učit od těch nejlepších. Za všechny jmenujme mistra escrimadora Zdeňka Kobrleho, který se podstatnou měrou podílí na rozvoji tohoto bojového umění v české republice, nebo velmistra Rene Latosu, zakladatele konceptu Latosa Escrima. Velmistr pravidelně jezdí do České republiky, kde trpělivě a s nadšením předává své znalosti. Přiložené fotografie byly pořízeny na jeho poslední návštěvě v Čechách, která se uskutečnila v říjnu 2018 a na které samozřejmě nechyběli ani zástupci slezských škol.</p>\r\n<div style=\"text-align: center;\"><img src=\"uploads/ES1.jpg\" alt=\"Latosa Escrima\" width=\"200\" height=\"135\" /> <img src=\"uploads/ES2.jpg\" alt=\"Latosa Escrima\" width=\"203\" height=\"135\" /> <img src=\"uploads/ES3.jpg\" alt=\"Latosa Escrima\" width=\"206\" height=\"135\" /> <img src=\"uploads/ES4.jpg\" alt=\"Latosa Escrima\" width=\"180\" height=\"135\" /> </div>\r\n<div style=\"text-align: center;\"> </div>\r\n<div style=\"text-align: center;\"><img src=\"uploads/ES5.jpg\" alt=\"Latosa Escrima\" width=\"180\" height=\"135\" /> <img src=\"uploads/ES6.jpg\" alt=\"Latosa Escrima\" width=\"203\" height=\"135\" /> <img src=\"uploads/ES7.jpg\" alt=\"Latosa Escrima\" width=\"203\" height=\"135\" /> <img src=\"uploads/ESC1.jpg\" alt=\"\" width=\"170\" height=\"134\" /> </div>\r\n<div style=\"text-align: center;\"><img src=\"uploads/ESC2.jpg\" alt=\"\" width=\"162\" height=\"147\" /> <img src=\"uploads/ESC3.jpg\" alt=\"\" width=\"102\" height=\"148\" /></div>\r\n<div style=\"text-align: center;\"> </div>\r\n<div style=\"text-align: center;\"> </div>\r\n<div> </div>', '2020-08-03 19:26:00', 1),
(2, '2018-12-02 12:43:31', 3, 'Vnimani-vzdalenosti-v-sebeobrane', 'bojová vzdálenost, sebeobrana, Wing Tsun, Wing chun, taktika boje', 'Bojová vzdálenost má podstatný vliv na schopnost obránce včas a adekvátně reagovat. Bojovník, který dobře ovládá boj na všechny vzdálenosti získává v boji přehled, prostor a čas.', 'Vnímání vzdálenosti v sebeobraně', 'Vzdálenost má podstatný vliv na schopnost obránce včas a adekvátně reagovat. Bojovník, který dobře ovládá vzdálenosti získává v boji přehled, prostor a čas. ', 'uploads/SN41.jpg', '<p>Obránce si bohužel nikdy nevybere čas, způsob a v neposlední řadě ani vzdálenost ze které na něj agresor zaútočí. Vzdálenost má pak podstatný vliv na možnost obránce včas, ale také adekvátně zareagovat.</p>\r\n<p>V rámci bojového střetu můžeme reálně hovořit o pěti bojových vzdálenostech, při kterých dochází k přímé fyzické konfrontaci.</p>\r\n<p style=\"padding-left: 30px;\"><strong>1. Vzdálenost zásahu nohou</strong></p>\r\n<p style=\"padding-left: 30px;\"><strong>2. Vzdálenost zásahu paží</strong></p>\r\n<p style=\"padding-left: 30px;\"><strong>3. Vzdálenost zásahů lokty a koleny</strong></p>\r\n<p style=\"padding-left: 30px;\"><strong>4. Těsná vzdálenost – „Tělo na tělo“</strong></p>\r\n<p style=\"padding-left: 30px;\"><strong>5. Boj na zemi</strong></p>\r\n<p>Je zjevné, že z pohledu realistické sebeobrany je nezbytná kvalitní příprava všech zmíněných vzdáleností. Vynecháním, byť jediné, vzniká mezera, která může mít fatální následky ve chvíli, kdy se obránci nepodaří agresora do preferované vzdálenosti vmanipulovat, nebo ho v ní udržet.</p>\r\n<p> </p>\r\n<h2>Vzdálenost 0 – Vzdálenost za hranicí zásahu</h2>\r\n<p>Z hlediska rizik a taktiky je nutné zahrnout i takzvanou vzdálenost nula, která se nachází za hranicí dosahu jakékoliv části lidského těla. Chce-li útočník zasáhnou svoji oběť musí překonat určitou vzdálenost, než vůbec dojde k fyzickému kontaktu, a proto je<strong> obránce v relativním bezpečí</strong>. Relativní je zde správný pojem. Útočník může mít střelnou zbraň, nebo může tuto „bezpečnou“ vzdálenost během okamžiku překonat, a cíl zasáhnout. Je tedy více než vhodné být připraven dřív, než dojde na první „kontaktní“ bojovou vzdálenost.</p>\r\n<p>Z pohledu tréninkové přípravy zde vyučujeme taktickou stránku. Patří sem orientace v prostoru, schopnost vzdálenost nula udržet, a samozřejmě i pozornost a schopnost potenciální nebezpečí zaregistrovat.</p>\r\n<p style=\"text-align: center;\"> </p>\r\n<div style=\"text-align: center;\"><img src=\"uploads/SN.jpg\" alt=\"\" width=\"60%\" height=\"\" /></div>\r\n<p style=\"text-align: center;\"> </p>\r\n<p style=\"text-align: center;\"> </p>\r\n<h2>Vzdálenost 1 - Vzdálenost zásahu nohou</h2>\r\n<p>Jakmile dojde k prolomení této vzdálenosti, může již dojít k fyzickému zásahu nejdelší částí lidského těla, nohou. Díky dosahu, síle a flexibilitě patří kopy mezi velmi nebezpečné techniky, které jsou schopny zasáhnou na poměrně dlouhou vzdálenost od těla a způsobit velké škody dřív, než se na řadu dostanou paže.</p>\r\n<p>Z pohledu tréninku Wing Tsun učí široké spektrum kopů. Nechybí přímé i obloukové kopy do všech směrů, „prošlapávácí“ kopy atd. Z pohledu taktiky pak rozeznáváme kopy obranné (zastavovací) a útočné.</p>\r\n<p> </p>\r\n<p style=\"text-align: center;\"><img src=\"uploads/SN1.jpg\" alt=\"\" width=\"60%\" height=\"\" /></p>\r\n<p style=\"text-align: center;\"> </p>\r\n<p style=\"text-align: center;\"> </p>\r\n<h2>Vzdálenost 2 – vzdálenost zásahu paží</h2>\r\n<p>Paže jsou v běžné činnosti lidí nejvíce využívanou částí těla. Ne jinak je tomu i v boji. Natáhnete-li své paže před sebe, pak vzdálenost mezi lokty a prsty je vzdálenost, kterou zde popisujeme.</p>\r\n<p>Ve Wing Tsun využíváme v této vzdálenosti údery i seky všech směrů, přičemž jakoukoliv část paže v této vzdálenosti využíváme jako dopadovou plochu úderu (pěst, dlaň, prsty pro vpichy, hranu ruky). Poměrně hojně jsou vyžívány i úchopové techniky mezi které patří strhy na zem, ale i páky a znehybňující techniky na různé části těla.</p>\r\n<p>Základním prvkem výuky Wing Tsun na druhou vzdálenost jsou takzvané <strong>„Řetězové údery“</strong>. Jde o sekvenci přímých úderů, které na sebe navazují a zasypávají agresora průměrnou rychlostí 6 až 8 úderů za sekundu. Při zvládnutí těchto úderů získáte nejen útočný potenciál, ale i účinnou obranu. Není snadné reagovat na tuto kadenci úderů.</p>\r\n<p> </p>\r\n<p style=\"text-align: center;\"><img src=\"uploads/SN2.jpg\" alt=\"\" width=\"60%\" height=\"\" /></p>\r\n<p style=\"text-align: center;\"> </p>\r\n<p> </p>\r\n<h2><strong>Vzdálenost 3 – Vzdálenost zásahů lokty a koleny</strong></h2>\r\n<p>Vzdálenost lze popsat opět pomocí dopředu natažených paží. V tomto případě se pohybujeme v rozmezí ramen a loktů. Z toho vyplývá, že zde využíváme nejčastěji údery lokty a krátké obloukové údery (háky), ve všech myslitelných směrech i kombinacích. Vzdálenost je ideální i pro použití kopů koleny.</p>\r\n<p> </p>\r\n<p style=\"text-align: center;\"><img src=\"uploads/SN3.jpg\" alt=\"\" width=\"60%\" height=\"\" /></p>\r\n<p style=\"text-align: center;\"> </p>\r\n<p style=\"text-align: center;\"> </p>\r\n<h2>Vzdálenost 4 – Těsná vzdálenost – „Tělo na tělo“</h2>\r\n<p>Vzdálenost čtyři se vyznačuje zejména tím, že těla soupeřů jsou velmi blízko u sebe, což do velké míry snižuje možnost použití technik z předchozích třech vzdáleností. Vzdálenosti dominují techniky zvané strhy, hody ale i podmety nohou. Ve všech případech je zde snaha soupeře shodit na zem, a tam jej v případě systému Wing Tsun zafixovat tak, aby již nemohl bojovat. Tedy aby soupeř ležel na zemi a Wing Tsun bojovník byl ve stoje a znehybněného soupeře měl plně pod kontrolou.</p>\r\n<p>Speciální součástí boje na těsnou vzdálenost je získání kontroly nad agresorem bez nutnosti hodu na zem. Používáme k tomu fixace končetin a hlavy pomocí pák a škrcení. Získáváme tím možnost manipulace s tělem agresora (vyvádění z místnosti, změně tělesné polohy apod.) aniž bychom museli použít důraznější techniky jako například údery a kopy. V bojových uměních se pro tuto část vžilo označení „Jemné techniky“.</p>\r\n<p> </p>\r\n<p style=\"text-align: center;\"><img src=\"uploads/SN4.jpg\" alt=\"\" width=\"40%\" height=\"\" /> <img src=\"uploads/SN41.jpg\" alt=\"\" width=\"40%\" height=\"\" /></p>\r\n<p style=\"text-align: center;\"> </p>\r\n<p style=\"text-align: center;\"> </p>\r\n<h2><strong>Vzdálenost 5 – boj na zemi</strong></h2>\r\n<p>Z taktického pohledu reálného boje a sebeobrany je tato vzdálenost velmi riskantní.</p>\r\n<p>Pokud totiž ležíte na zemi a agresor stojí na nohou je samozřejmě v taktické výhodě, a prakticky lze počítat s tím, že po vás bude dupat, či si vaše tělo „splete“ s fotbalovým míčem. Nachází-li se na zemi i agresor, tak je minimálně nezbytné vycházet z předpokladu, že agresor má vždy „kamarády“, kteří si jistě budou chtít taky kopnout. „Kamarádi“ se samozřejmě rádi přidají i když ležíte na zemi jen vy.</p>\r\n<p>V našem systému je snahou se této vzdálenosti, pokud možno vyhnout, a pokud už se na zem dostaneme, ihned se dostáváme zpět na nohy. Pád na zem ale nejde zcela vyloučit, a je nezbytné počítat i s touto eventualitou. Nejčastější důvody přechodu na zem jsou klopýtnutí, zakopnutí o schod nebo taktéž situace, kdy se agresoru podaří strh nebo podmet.</p>\r\n<p>Obsahem výuky jsou dvě oblasti. Jedna se věnuje situacím, kdy <strong>jsme na zemi a agresor je na nohou</strong>.</p>\r\n<p>Druhá pak učí samostatný boj na zemi, tedy kdy je nutné <strong>bojovat s agresorem, který je na zemi spolu s námi.</strong></p>\r\n<p> </p>\r\n<p style=\"text-align: center;\"><strong><img src=\"uploads/SN5.jpg\" alt=\"\" width=\"40%\" height=\"\" /> <img src=\"uploads/SN51.jpg\" alt=\"\" width=\"40%\" height=\"\" /></strong></p>', '0000-00-00 00:00:00', 1),
(3, '2019-01-25 12:43:31', 5, 'Sebeobrana-deti-Nezbytnost-situacnich-her', 'sebeobrana dětí, Wing Tsun, situační hry, bezpečnost, únos, šikana, prevence násilí, kyberšikana, agrese, Sebeobrana Ostrava, Sebeobrana Český Těšín, praktická sebeobrana, bezpečí, rady rodičům', 'Každé dítě ví, že s nikým cizím nesmí mluvit, nikam chodit atd. Ano, jistě ví, ale vědět neznamená umět. Článek je inspirací pro rodiče, jak vědět přeměnit na umět. Obsahuje informace, jakým způsobem lze hrou dítěti poskytnout praktickou zkušenost se sebeobranou a nebezpečím číhajícím v reálném životě. Mezi nejběžnější ohrožení dětí patří zejména šikana, kyberšikana, únos, sexuální zneužívání atd. ', 'Sebeobrana dětí | Nezbytnost situačních her', 'Každé dítě ví, že s nikým cizím nesmí mluvit, nikam chodit atd. Ano, jistě ví, ale vědět neznamená umět. Článek je inspirací pro rodiče, jak vědět přeměnit na umět. ', 'uploads/D1.jpg', '<p>„<em>S nikým cizím se nebav!“ „Od nikoho cizího si nic neber!“ „Neotevírej dveře cizím lidem!“ „Nikdo ti nesmí dělat nic, co ti je nepříjemné“ „Na internetu nejsou jen dobří lidé“ atd. atd. </em></p>\r\n<p>Všichni zodpovědní rodiče tyto cenné rady svým dětem vtloukají do hlavy prakticky ihned, když jsou schopné vnímat a pochopit. Dítě získá teoretickou znalost, co může být pro něj potenciálně nebezpečné a na co si má dávat pozor. Je ovšem nezbytné tuto znalost převést v dovednost, a tu nelze nabýt jinak než praxí. Samozřejmě nevystavujeme dobrovolně dítě reálnému nebezpečí. Postačí, pokud s dětmi budeme například hrát tzv. <strong>situační hry</strong>.</p>\r\n<h3 style=\"text-align: center;\"><em>\"Co slyším, to zapomenu. Co vidím, si pamatuji. <strong>Co si vyzkouším, tomu rozumím</strong>.\"</em></h3>\r\n<p style=\"text-align: center;\"><em>Konfucius</em></p>\r\n<p>Situační hry mají za úkol praktické nacvičení schopnosti dítěte rozpoznat a samostatně řešit potenciální nebezpečí a krizové situace, ale také seznámit dítě s tím, co je stres vyvolaný násilím.  <strong>Dítě si během nácviku musí prožít emoční reakci, kterou stres vyvolává.</strong> Samozřejmě v přiměřené míře vzhledem k věku dítěte a pod neustálou kontrolou rodiče nebo profesionála. Důležité je, že <strong>nakonec musí dítě vždy zvítězit</strong>. Primárně díky tomuto přístupu, kdy propojíme praktickou zkušenost s emočním prožitkem a samozřejmě konečným vítezstvím dítěte, zvyšujeme významně schopnost dítěte uvědomit si a rozpoznat potenciální nebezpečí a řešit krizové situace. Sekundárně se tento nácvik rovněž pozitivně odráží i na psychice dítěte a jeho sebevědomí.</p>\r\n<p style=\"text-align: center;\"><img src=\"uploads/D4.jpg\" alt=\"Sebeobrana dětí\" width=\"50%\" height=\"NaN\" /> </p>\r\n<p><strong>V našich kurzech vytváříme situační hry, které dětí rozvíjí zejména v těchto klíčových dovednostech dětské sebeobrany </strong></p>\r\n<h4><strong>Uvědomění si nebezpečí </strong></h4>\r\n<div><em>- Na ulici, na internetu, ve škole apod. </em></div>\r\n<div> </div>\r\n<h4><strong>Využívání prostoru a okolí</strong></h4>\r\n<div style=\"text-align: left;\"><em>- Dítě se musí umět nebezpečným místům vyhýbat, a v případě krizové situace umět bezpečně místo opustit a najít rychle bezpečí. Vše v reálném i virtuálním světě. </em></div>\r\n<div style=\"text-align: left;\"> </div>\r\n<h4><strong>Komunikační dovednosti </strong></h4>\r\n<div><em>- Kupříkladu dovednost říct si o pomoc cizím lidem, správně komunikovat s cizími lidmi, řešit slovně agresi spolužáků, a to jak v reálném životě, tak i na internetu </em></div>\r\n<div> </div>\r\n<h4><strong>Odolávání útoku</strong></h4>\r\n<div><em>- I když jsou děti menší, lehčí a slabší, musí mít šanci odolat útoku</em></div>\r\n<div> </div>\r\n<p style=\"text-align: center;\"><img src=\"uploads/D6.jpg\" alt=\"Únos dítěte\" width=\"50%\" height=\"NaN\" /></p>\r\n<p><strong>Zkuste si děti „otestovat“</strong> <strong>jak umějí teorii změnit v praxi,</strong> a nebojte se trochu intrikovat.</p>\r\n<p>Agresoři v reálném světě nejsou jiní. Svůj záměr zabalí do hezké „pohádky“, a<strong> že je něco špatně, si dítě většinou uvědomí, až když je pozdě</strong>. „Pohádkové“ testy v rámci kurzů a seminářů s dětmi často aplikujeme, a výsledkem je, že takto <strong>„naletí“ 8 z 10 dětí</strong>, které neprošly kvalitním „domácím“ nebo organizovaným kurzem sebeobrany. </p>\r\n<p>Pokud zjistíte, že vaše dítě vašim „pastem“ naletělo zvažte, jestli váš čas strávený s dítětem neobohatíte alespoň o zmíněné „situační hry“. Případně přihlaste své dítě do kvalitního kurzu, který se touto problematikou zabývá. Chráníte přece to nejcennější, co máte, své děti!</p>', '0000-00-00 00:00:00', 1),
(4, '2019-07-25 12:43:31', 3, 'Demo-video-z-Letniho-kempu-Wing-Tsun-Slezsko-2019', 'Wing Tsun Slezsko, Wing Tsun, video, Letní kemp, Bojové umění, sebeobrana, HKWTA', 'Krátké video z Letního kempu Wing Tsun Slezsko 2019', 'Demo video z Letního kempu Wing Tsun Slezsko 2019', 'Jak vypadá Wing Tsun v podání žáků, kteří se k nám a Hongkongské Wing Tsun organizaci (HKWTA) přidali před necelým rokem můžete zhlédnout na videích, která vznikla na letošním letním kempu v Jeseníku nad Odrou. Zvolit můžete s delší či kratší varianty.', 'uploads/AVK17.jpg', '<div>Jak vypadá bojové umění Wing Tsun v podání žáků, kteří se k nám a Hongkongské Wing Tsun organizaci (HKWTA) přidali před necelým rokem můžete zhlédnout na krátkém videu, které vzniklo na letošním Letním kempu v Jeseníku nad Odrou.</div>\r\n<div>Další videa naleznete na našem You Tube kanálu <a title=\"Wing Tsun Slezsko\" href=\"https://www.youtube.com/channel/UCePeiN--5SdiJ1MlbdVgkAg?view_as=subscriber\">Wing Tsun Slezsko</a>.</div>\r\n<div> </div>\r\n<div> </div>\r\n<p><iframe style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"//www.youtube.com/embed/ScN74XpsWhU\" width=\"50%\" height=\"350\"></iframe></p>\r\n<p> </p>', '0000-00-00 00:00:00', 1),
(24, '2019-04-25 12:43:31', 2, 'Wing-Tsun-Junior-Nabor-detske-sebeobrany', 'Dětská sebeobrana, Wing Tsun pro děti, šikana, únosy dětí, Bojové umění pro děti, prevence násilí na dětech, Sebeobrana Ostrava, Ostrava, Wing chun pro děti, prevence kriminality Ostrava', 'Učíme děti Wing Tsun, tedy bojové umění a sebeobranu přizpůsobenou mentálním i fyzickým možnostem dětí. Zábavnou formou a hravě.  Všechno naše snažení směřuje k primární i sekundární prevenci v oblasti šikany, únosů, dětské agrese a širokého spektra dalších druhů násilí páchaného na dětech jak v reálném světě, tak na internetu.', 'Wing Tsun Junior | Nábor dětské sebeobrany', 'Učíme děti Wing Tsun, tedy bojové umění a sebeobranu přizpůsobenou mentálním i fyzickým možnostem dětí. Zábavnou formou a hravě.  Všechno naše snažení směřuje k primární i sekundární prevenci v oblasti šikany, dětské agrese a širokého spektra dalších druhů násilí páchaného na dětech jak v reálném světě, tak na internetu.', 'uploads/Stopbullying.jpg', '<p>Učíme děti <a href=\"wingtsun\">Wing Tsun</a>, tedy bojové umění a sebeobranu přizpůsobenou mentálním i fyzickým možnostem dětí. Zábavnou formou a hravě.</p>\r\n<p>Všechno naše snažení směřuje k primární i sekundární <strong>prevenci v oblasti šikany, únosů, dětské agrese a širokého spektra dalších druhů násilí páchaného na dětech</strong> jak v reálném světě, tak na internetu.</p>\r\n<p>Wing Tsun Junior je určen věkové skupině dětí <strong>od šesti do jedenácti let</strong>.</p>\r\n<p style=\"text-align: center;\">  <img src=\"uploads/D3.jpg\" alt=\"Děti\" width=\"NaN\" height=\"NaN\" /></p>\r\n<h3>Obsah výuky:</h3>\r\n<h4>1. Dětská gymnastika a fyzická průprava</h4>\r\n<p>Hry a cvičení zaměřené na správný a rovnoměrný fyzický rozvoj dítěte.</p>\r\n<h4>2. Teoretická a komunikační průprava</h4>\r\n<p>V této části se děti učí, jak mají jednat v případě šikany, obtěžování cizími lidmi, únosu a jiných situací, které ve spojení s touto problematikou mohou děti potkat.</p>\r\n<h4>3. Praktický nácvik sebeobranných postupů</h4>\r\n<p>Nácvik jednoduchých a účinných sebeobranných technik a pohybů, odpovídajících mentálním a fyzickým možnostem dětí.</p>\r\n<h4>4. Modelové situace</h4>\r\n<p>Jedná se o spojení všech předchozích částí. Navodí se určitá situace a děti se ji snaží nejdříve společně a později samostatně vyřešit.</p>\r\n<h3>Výuka probíhá:</h3>\r\n<p>V Ostravské škole Wing Tsun. Přesnou adresu najdete <a href=\"nase-skoly\">zde</a>.</p>\r\n<h3><strong>Garant projektu:</strong></h3>\r\n<div style=\"text-align: left; padding-left: 30px;\"><strong>Bc. Petr Walaski</strong></div>\r\n<div style=\"text-align: left; padding-left: 30px;\">- absolvent Pedagogické fakulty Ostravské univerzity</div>\r\n<div style=\"text-align: left; padding-left: 30px;\">- instruktor Wing Tsun, Escrima, Karate</div>\r\n<div style=\"text-align: left; padding-left: 30px;\">- 25ti letá praxe s výukou dětí</div>\r\n<div style=\"text-align: left; padding-left: 30px;\"> </div>\r\n<div style=\"text-align: left; padding-left: 30px;\"> </div>\r\n<p style=\"text-align: center;\"><a style=\"text-decoration: none;\" href=\"formular/Nabor Deti Ostrava\"><button style=\"background-color: #1be810; color: #00235b; width: 75%;\">Mám zájem o další informace</button></a></p>', '0000-00-00 00:00:00', 1),
(25, '2020-04-25 12:43:31', 2, 'Workshop-Sam-sobe-ochrancem-Prevence-unosu-a-nasili-pachaneho-na-detech', '', '', 'Workshop - Sám sobě ochráncem - Prevence únosů a násilí páchaného na dětech', 'Přestože jsou děti neustále poučovány o tom, že s nikým cizím nesmí mluvit, nikam chodit atd., není pro dospělého člověka problém se dítěte zmocnit využitím lstí nebo fyzické síly.  Pod vedením zkušeného lektora děti získají informace a praktický návod, jak se nestát obětí násilného jednání, odvlečení či únosu. Rodiče pak získají inspiraci, jak mohou obohatit svou výchovu v oblasti bezpečí svých dětí.', 'uploads/D1.jpg', '<div>Přestože jsou děti neustále poučovány o tom, že s nikým cizím nesmí mluvit, nikam chodit atd., není pro dospělého člověka problém se dítěte zmocnit využitím lstí nebo fyzické síly.</div>\r\n<div>Pod vedením zkušeného lektora děti získají informace a praktický návod, jak se nestát obětí násilného jednání, odvlečení či únosu. Rodiče pak získají inspiraci, jak mohou obohatit svou výchovu v oblasti bezpečí svých dětí.</div>\r\n<div> </div>\r\n<div style=\"text-align: center;\"> </div>\r\n<div style=\"text-align: center;\"> <img src=\"uploads/DSZO10.jpg\" alt=\"\" width=\"30%\" height=\"NaN\" /></div>\r\n<h2><strong>Obsah</strong></h2>\r\n<div><strong>Obsahově je workshop přizpůsoben dětem ve věku 6 až 11 let, a je rozdělen na dvě části.</strong></div>\r\n<ul>\r\n<li>První část je teoretická. Seznámí děti s problematikou násilí páchaného na dětech, únosů, nejčastějšími „triky“ únosců, které děti obtížně prohlédnou a návodem chování, jak můžou minimalizovat riziko vedoucí k násilnému jednání, únosu či odvlečení. Vše doprovázeno praktickými ukázkami.</li>\r\n<li>Druhá část je věnována praktickému řešení modelových krizových situací. Mezi tyto situace patří například přímý verbální a fyzický kontakt s únoscem, snaha o odvlečení, zatažení do dopravního prostředku apod.</li>\r\n</ul>\r\n<p style=\"text-align: center;\"> </p>\r\n<p style=\"text-align: center;\"><img src=\"uploads/20191112_093529.jpg\" alt=\"\" width=\"30%\" height=\"NaN\" /></p>\r\n<h2><strong>Lektor</strong></h2>\r\n<div><strong>Bc. Petr Walaski</strong></div>\r\n<ul>\r\n<li>Lektor krizové komunikace a prevence kriminality páchané na dětech s 25letou praxí</li>\r\n<li>Instruktor sebeobrany s 30letou praxí</li>\r\n<li>Bývalý člen Útvaru pro ochranu ústavních činitelů Policie ČR</li>\r\n<li>Absolvent bakalářského studia Sociální pedagogika – prevence a resocializace, zakončeného bakalářskou prací na téma Šikana ve školách.</li>\r\n</ul>\r\n<p style=\"text-align: center;\"> </p>\r\n<p style=\"text-align: center;\"><img src=\"uploads/20191112_092139.jpg\" alt=\"\" width=\"30%\" height=\"NaN\" /></p>\r\n<h2><strong>Termín a místo konání</strong></h2>\r\n<div>Sobota 1. 2. 2020 9.00 – 11:30 hodin</div>\r\n<div>5. Základní škola Koperníkova Třinec, Koperníkova 696, Lyžbice, 739 61 Třinec</div>\r\n<h2><strong>Cena workshopu</strong> 300 Kč (Rodiče + 1 dítě) Každý další sourozenec +50 Kč.</h2>\r\n<h2><strong>Pořadatel</strong></h2>\r\n<h2 style=\"text-align: left;\"><strong>Slezské sdružení prevence kriminality, z.s.</strong></h2>\r\n<div style=\"text-align: left;\">Bc. Petr Walaski</div>\r\n<div style=\"text-align: left;\">předseda spolku / lektor</div>\r\n<div style=\"text-align: left;\">adresa: Růžová 608, 739 61 Třinec</div>\r\n<div style=\"text-align: left;\">mob.: +420 608 727 718</div>\r\n<div style=\"text-align: left;\">email: <a>petr.walaski@prevkrim.cz</a></div>\r\n<div style=\"text-align: left;\"> </div>\r\n<div style=\"text-align: left;\"> </div>\r\n<div style=\"text-align: left;\"> </div>\r\n<p style=\"text-align: center;\"><a style=\"text-decoration: none;\" href=\"formular/Workshop Sám sobě ochráncem Třinec\"><button style=\"background-color: #1be810; color: #00235b; width: 75%;\">Mám zájem</button></a></p>', '0000-00-00 00:00:00', 1),
(70, '2020-09-15 18:37:07', 1, 'novy-clanek', '', '', 'Nový článek', '', '', '<p class=\"ql-align-center\"><img src=\"../gallery/70/denisSarkozi.png\">fsdo;jdfsdf;mlsdamfsd;lfmsdffdsf</p>', '2020-09-15 18:37:07', 1),
(71, '2020-09-16 18:44:49', 0, '', '', '', 'Nový článek', '', '', '', '2020-09-17 18:44:49', 1),
(72, '2020-10-18 13:52:12', 0, '', '', '', 'Nový článek', '', '', '', '2020-10-19 13:52:12', 0),
(73, '2020-10-19 16:08:10', 2, 'novy-clanekxckdsjfh', 'sdfds', '', 'Nový článekXckdsjfh', 'oiuehfosfsouhfsudf', '', '<p>wesfdfsfdsfsdfsdf hoyoeur</p>', '2020-10-20 16:08:10', 0),
(83, '2020-10-24 16:16:57', 0, '', '', '', 'Nový článek', '', '', '', '2020-10-25 16:16:57', 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `ex_article_img`
--

CREATE TABLE `ex_article_img` (
  `id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `url` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL DEFAULT '',
  `visible` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `ex_article_img`
--

INSERT INTO `ex_article_img` (`id`, `article_id`, `url`, `visible`) VALUES
(125, 58, '/gallery/58/chrisCollins copy 2.png', 1),
(126, 58, '/gallery/58/chrisCollins copy 4.png', 1),
(127, 58, '/gallery/58/chrisCollins copy 3.png', 1),
(128, 58, '/gallery/58/chuenFun copy 2.png', 1),
(129, 58, '/gallery/58/chrisCollins copy 5.png', 1),
(130, 58, '/gallery/58/chrisCollins copy.png', 1),
(131, 58, '/gallery/58/chrisCollins.png', 1),
(132, 58, '/gallery/58/chuenFun copy 3.png', 1),
(133, 58, '/gallery/58/chuenFun copy 4.png', 1),
(134, 58, '/gallery/58/chuenFun copy 5.png', 1),
(135, 58, '/gallery/58/chuenFun copy.png', 1),
(136, 58, '/gallery/58/chuenFun.png', 1),
(137, 59, '/gallery/59/chrisCollins copy 2.png', 1),
(138, 59, '/gallery/59/chrisCollins copy 3.png', 1),
(139, 59, '/gallery/59/chrisCollins copy 5.png', 1),
(140, 59, '/gallery/59/chrisCollins copy 4.png', 1),
(141, 59, '/gallery/59/chrisCollins copy.png', 1),
(142, 59, '/gallery/59/chrisCollins.png', 1),
(143, 59, '/gallery/59/chuenFun copy 2.png', 1),
(144, 59, '/gallery/59/chuenFun copy 3.png', 1),
(145, 59, '/gallery/59/chuenFun copy 4.png', 1),
(146, 59, '/gallery/59/chuenFun copy.png', 1),
(147, 59, '/gallery/59/chuenFun copy 5.png', 1),
(148, 59, '/gallery/59/chuenFun.png', 1),
(149, 60, '/gallery/60/chrisCollins copy 2.png', 0),
(150, 60, '/gallery/60/chrisCollins copy 4.png', 1),
(151, 60, '/gallery/60/chrisCollins copy 3.png', 1),
(152, 60, '/gallery/60/chrisCollins copy 5.png', 1),
(153, 60, '/gallery/60/chrisCollins copy.png', 1),
(154, 60, '/gallery/60/chrisCollins.png', 1),
(155, 60, '/gallery/60/chuenFun copy 2.png', 1),
(156, 60, '/gallery/60/chuenFun copy 3.png', 1),
(157, 60, '/gallery/60/chuenFun copy 4.png', 1),
(158, 60, '/gallery/60/chuenFun.png', 1),
(159, 60, '/gallery/60/chuenFun copy 5.png', 1),
(160, 60, '/gallery/60/chuenFun copy.png', 1),
(161, 61, '/gallery/61/trinec1.png', 1),
(162, 61, '/gallery/61/trinec0.png', 1),
(163, 61, '/gallery/61/trinec0.png', 1),
(164, 61, '/gallery/61/trinec1.png', 1),
(167, 6, '/gallery/6/Nezastavuj.jpg', 1),
(168, 6, '/gallery/6/ZsKastanova.png', 1),
(169, 63, '/gallery/63/trinec1.png', 1),
(170, 66, '/gallery/66/trinec0.png', 1),
(179, 70, '/gallery/70/adamMajtner.png', 0),
(180, 70, '/gallery/70/chuenFun.png', 1),
(181, 70, '/gallery/70/denisSarkozi.png', 0),
(182, 70, '/gallery/70/chrisCollins.png', 1),
(183, 70, '/gallery/70/barca.png', 1),
(184, 70, '/gallery/70/deti2.png', 1),
(185, 72, '/gallery/72/chrisCollins.png', 1),
(186, 72, '/gallery/72/deti2.png', 1),
(187, 72, '/gallery/72/barca.png', 1),
(188, 72, '/gallery/72/denisSarkozi.png', 1),
(189, 72, '/gallery/72/chuenFun.png', 1),
(190, 83, '/gallery/83/chrisCollins.png', 1),
(191, 83, '/gallery/83/denisSarkozi.png', 1),
(192, 83, '/gallery/83/chuenFun.png', 1),
(193, 83, '/gallery/83/barca.png', 1),
(194, 83, '/gallery/83/adamMajtner.png', 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `in_chat`
--

CREATE TABLE `in_chat` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `sender` varchar(50) COLLATE utf8_czech_ci NOT NULL,
  `receiver` varchar(50) COLLATE utf8_czech_ci NOT NULL,
  `text` varchar(5000) COLLATE utf8_czech_ci NOT NULL,
  `checked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `in_equipment`
--

CREATE TABLE `in_equipment` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_czech_ci NOT NULL,
  `school` int(11) NOT NULL,
  `description` varchar(10000) COLLATE utf8_czech_ci NOT NULL,
  `memberlimit` int(11) NOT NULL,
  `memberlimit_min` int(11) NOT NULL,
  `members` int(11) NOT NULL,
  `notconfirmed` int(11) NOT NULL,
  `datetime_deadline` datetime NOT NULL,
  `hide` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `in_equipment`
--

INSERT INTO `in_equipment` (`id`, `name`, `school`, `description`, `memberlimit`, `memberlimit_min`, `members`, `notconfirmed`, `datetime_deadline`, `hide`) VALUES
(1, 'Triko HKWTA (oficiální)', 0, '<div>- Oficiální triko organizace HKWTA<br />- Barva: Bílá, šedá, černá<br />- Velikosti: XS, S, M, L, XL, XXL, XXXL<br />- Cena: 300 Kč</div><br />\r\n<p>Upozornění: Na tréninky lze nosit pouze triko v barvě stupně, která je cvičencem dosažena.</p><br />\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"uploads/Trikosede.jpg\" alt=\"\" width=\"75%\" height=\"NaN\" /></p>', 0, 0, 5, 0, '2020-06-27 20:00:00', 0),
(2, 'Kalhoty Wing Tsun', 0, '<div>- Tréninkové kalhoty WT Slezsko<br />- Velikost je odvozena od tělesné výšky. Při objednávce je třeba udat vaši výšku zaokrouhlenou po 5 cm (např. 160, 165, 170...)<br />- Cena: 500 Kč</div><br />\r\n<p> </p><br />\r\n<p> </p><br />\r\n<p> </p><br />\r\n<p style=\"text-align: center;\"><img src=\"uploads/KalhotyWT.jpg\" alt=\"\" width=\"40%\" height=\"NaN\" /></p>', 0, 5, 10, 1, '2020-03-01 01:00:00', 0),
(3, 'Mikina volnočasová, bez kapuce, VÝŠIVKA', 0, '<p>Volnočasová mikina bez kapuce</p><br />\r\n<div>- Barva: Tmavá břidlice<br />- Velikosti: S, M, L, XL, XXL, XXXL<br />- Cena: 900 Kč<br />- LOGA jsou VYŠÍVANÁ</div><br />\r\n<p style=\"text-align: center;\"> <img src=\"uploads/Mikina_predek.jpg\" alt=\"Přední trana\" width=\"40%\" height=\"NaN\" /> <img src=\"uploads/Mikina_zadek_end.jpg\" alt=\"Zadní strana\" width=\"40%\" height=\"NaN\" /></p>', 0, 5, 6, 0, '2020-06-30 00:00:00', 0),
(4, 'Mikina volnočasová, bez kapuce, POTISK', 0, '<p>Volnočasová mikina bez kapuce</p><br />\r\n<div>- Barva: Tmavá břidlice<br />- Velikosti: S, M, L, XL, XXL, XXXL<br />- Cena: 600 Kč<br />- LOGA jsou natištěná</div>', 0, 5, 0, 0, '2020-06-30 00:00:00', 0),
(5, 'Kšiltovka', 0, '<p><strong>Kšiltovka</strong></p><br />\r\n<div>- Barva: černá (po dohodě lze barvu přizpůsobit požadavku)<br />- Velikosti: univerzál (nastavitelná)<br />- Cena: 200 Kč<br /> - LOGO je VYŠÍVANÉ</div><br />\r\n<p style=\"text-align: center;\"><img src=\"uploads/Ksiltovka.jpg\" alt=\"\" width=\"50%\" height=\"NaN\" /></p>', 0, 5, 4, 0, '2020-06-30 00:00:00', 0),
(6, 'Kraťasy Wing Tsun (tréninkové)', 0, '<div>- Tréninkové kraťasy WT<br />- Velikost je odvozena od tělesné výšky. Při objednávce je třeba udat vaši výšku zaokrouhlenou po 5 cm (např. 160, 165, 170...)<br />- Cena: 500 Kč (Cena je stejná jako u WT kalhot, bohužel se nedá domluvit cena nižší)</div>', 0, 5, 6, 0, '2020-06-30 00:00:00', 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `in_equipment_orders`
--

CREATE TABLE `in_equipment_orders` (
  `id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL,
  `user_id` int(50) NOT NULL,
  `signdate` datetime NOT NULL,
  `confirmed` tinyint(1) NOT NULL,
  `notpresent` tinyint(4) NOT NULL,
  `guest` tinyint(1) NOT NULL,
  `guest_name` varchar(100) COLLATE utf8_czech_ci NOT NULL,
  `guest_surname` varchar(100) COLLATE utf8_czech_ci NOT NULL,
  `size` varchar(5) COLLATE utf8_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `in_equipment_orders`
--

INSERT INTO `in_equipment_orders` (`id`, `equipment_id`, `user_id`, `signdate`, `confirmed`, `notpresent`, `guest`, `guest_name`, `guest_surname`, `size`) VALUES
(4, 1, 19, '2019-09-16 11:35:34', 1, 0, 0, '', '', 'XXL'),
(5, 2, 73, '2019-09-22 09:09:10', 1, 1, 0, '', '', '190'),
(6, 2, 18, '2019-09-22 17:16:26', 1, 1, 0, '', '', '180'),
(7, 5, 34, '2019-09-26 19:27:08', 1, 0, 0, '', '', 'Unive'),
(8, 5, 80, '2019-09-27 11:23:58', 1, 1, 0, '', '', 'Unive'),
(9, 3, 80, '2019-09-27 11:24:34', 1, 1, 0, '', '', 'M'),
(14, 6, 19, '2019-10-10 07:15:50', 1, 0, 0, '', '', '200'),
(15, 3, 16, '2019-10-19 21:00:27', 1, 0, 0, '', '', 'M'),
(16, 6, 16, '2019-10-19 21:00:44', 1, 0, 0, '', '', 'M'),
(17, 2, 97, '2019-10-23 22:08:28', 1, 0, 0, '', '', '180'),
(19, 2, 92, '2019-11-10 12:48:36', 1, 0, 0, '', '', '180'),
(20, 1, 92, '2019-11-10 12:49:52', 1, 0, 0, '', '', 'BíléM'),
(21, 1, 87, '2019-11-13 13:37:04', 1, 0, 0, '', '', 'M'),
(23, 6, 87, '2019-11-13 13:43:08', 1, 0, 0, '', '', 'měřím'),
(24, 2, 87, '2019-11-13 13:43:31', 1, 0, 0, '', '', 'měřím'),
(25, 2, 48, '2019-11-13 17:01:23', 1, 0, 0, '', '', '185'),
(26, 3, 23, '2019-11-13 17:51:27', 1, 1, 0, '', '', 'Dušan'),
(27, 3, 25, '2019-11-13 21:00:18', 1, 0, 0, '', '', 'M'),
(28, 6, 47, '2019-11-13 23:25:40', 1, 0, 0, '', '', '175'),
(29, 2, 14, '2019-11-14 14:51:14', 1, 0, 0, '', '', '178'),
(32, 2, 115, '2019-11-20 20:50:10', 1, 0, 0, '', '', 'výška'),
(33, 2, 104, '2019-12-04 09:30:15', 1, 0, 0, '', '', '180'),
(34, 1, 104, '2019-12-04 09:31:56', 1, 0, 0, '', '', 'Bílá3'),
(35, 3, 14, '2020-01-05 15:22:31', 1, 0, 0, '', '', 'M'),
(36, 1, 117, '2020-01-24 13:46:12', 1, 0, 0, '', '', 'M'),
(37, 2, 66, '2020-01-29 23:18:48', 1, 0, 0, '', '', '175cm'),
(38, 6, 22, '2020-02-07 08:56:30', 1, 0, 0, '', '', '185'),
(39, 2, 22, '2020-02-07 08:57:42', 0, 0, 0, '', '', '180'),
(40, 6, 34, '2020-02-21 07:46:49', 1, 0, 0, '', '', '180'),
(41, 3, 36, '2020-02-25 20:06:30', 1, 0, 0, '', '', 'L'),
(42, 5, 36, '2020-02-25 20:08:00', 1, 0, 0, '', '', 'unive'),
(43, 5, 23, '2020-02-28 19:58:28', 1, 0, 0, '', '', 'uni?');

-- --------------------------------------------------------

--
-- Struktura tabulky `in_events`
--

CREATE TABLE `in_events` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `name` varchar(100) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `school` int(11) NOT NULL DEFAULT 0,
  `location` varchar(500) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `prize` varchar(50) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `description` varchar(5000) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `memberlimit` int(11) NOT NULL DEFAULT 0,
  `memberlimit_min` int(11) NOT NULL DEFAULT 0,
  `members` int(11) NOT NULL DEFAULT 0,
  `confirmed` int(11) NOT NULL DEFAULT 0,
  `present` int(11) NOT NULL DEFAULT 0,
  `datetime_start` datetime NOT NULL DEFAULT current_timestamp(),
  `datetime_deadline` datetime NOT NULL DEFAULT current_timestamp(),
  `datetime_end` datetime NOT NULL DEFAULT current_timestamp(),
  `autoconfirm` tinyint(1) NOT NULL DEFAULT 0,
  `visible` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `in_events`
--

INSERT INTO `in_events` (`id`, `datetime`, `name`, `school`, `location`, `prize`, `description`, `memberlimit`, `memberlimit_min`, `members`, `confirmed`, `present`, `datetime_start`, `datetime_deadline`, `datetime_end`, `autoconfirm`, `visible`) VALUES
(149, '2020-08-14 14:41:51', 'Nová 2', 0, '', '', '', 0, 0, 0, 0, 0, '2020-08-14 14:41:51', '2020-08-19 14:41:51', '2020-08-14 15:41:51', 0, 1),
(150, '2020-08-22 17:02:54', 'Nová', 0, '', '', 'nejaky popis', 0, 0, 0, 0, 0, '2020-08-22 17:02:54', '2020-08-22 17:02:54', '2020-08-22 18:02:54', 0, 1),
(151, '2020-08-22 17:03:08', 'Nová', 0, '', '', '', 0, 0, 0, 0, 0, '2020-08-22 17:03:08', '2020-08-22 17:03:08', '2020-08-22 18:03:08', 0, 0),
(152, '2020-08-29 16:56:18', 'Nová', 0, '', '', 'iodgjoidjgoaijfgosifjsoifjspodfjksdfs', 0, 0, 0, 0, 0, '2020-08-29 16:56:18', '2020-08-29 16:56:18', '2020-08-29 17:56:18', 0, 1),
(153, '2020-08-29 17:18:43', 'Nová', 0, '', '', '<ol><li>9sjfsfijirs</li><li>dsfsd</li><li>fsdf</li><li>sdfs</li></ol>', 0, 0, 0, 0, 0, '2020-08-29 17:18:43', '2020-08-29 17:18:43', '2020-08-29 18:18:43', 0, 1),
(154, '2020-08-30 12:05:29', 'Nová', 0, '', '', '', 0, 0, 0, 0, 0, '2020-08-30 12:05:29', '2020-08-30 12:05:29', '2020-08-30 13:05:29', 0, 0),
(155, '2020-09-15 18:45:06', 'Nová', 0, '', '', '', 0, 0, 0, 0, 0, '2020-09-15 18:45:06', '2020-09-15 18:45:06', '2020-09-15 19:45:06', 0, 0),
(156, '2020-09-19 14:22:41', 'Nová', 0, '', '', '', 0, 0, 1, 0, 0, '2020-09-19 14:22:41', '2020-09-20 11:22:41', '2020-09-19 15:22:41', 0, 1),
(157, '2020-09-23 11:32:55', 'Nová', 0, '', '', '', 0, 0, 2, 0, 0, '2020-09-23 11:32:55', '2020-09-24 09:32:55', '2020-09-23 12:32:55', 0, 1),
(158, '2020-09-23 12:33:52', 'Nová', 0, '', '', '', 0, 0, 1, 0, 0, '2020-09-23 12:33:52', '2020-09-24 12:33:52', '2020-09-23 13:33:52', 0, 1),
(160, '2020-10-17 14:04:12', 'Nová', 0, '', '', '', 0, 0, 0, 0, 0, '2020-10-17 14:04:12', '2020-10-17 14:04:12', '2020-10-17 15:04:12', 0, 0),
(162, '2020-10-17 15:11:14', 'Nová', 0, '', '', '', 0, 0, 0, 0, 0, '2020-10-17 15:11:14', '2020-10-17 15:11:14', '2020-10-17 16:11:14', 0, 0),
(163, '2020-10-18 13:56:22', 'Nová', 0, '', '', '', 0, 0, 0, 0, 0, '2020-10-18 13:56:22', '2020-10-18 13:56:22', '2020-10-18 14:56:22', 0, 0),
(164, '2020-10-18 13:56:26', 'Nová - Kopie', 0, '', '', '', 0, 0, 0, 0, 0, '2020-10-18 13:56:22', '2020-10-18 13:56:22', '2020-10-18 14:56:22', 0, 0),
(168, '2020-10-18 17:31:39', 'Nová', 0, '', '', '', 0, 0, 0, 0, 0, '2020-10-18 17:31:39', '2020-10-18 17:31:39', '2020-10-18 18:31:39', 0, 0),
(169, '2020-10-18 20:56:32', 'Nová', 0, '', '', '', 0, 0, 1, 0, 0, '2020-10-18 20:56:32', '2020-10-19 20:56:32', '2020-10-18 21:56:32', 0, 0),
(170, '2020-10-19 15:34:20', 'Novásc', 0, '', '', '', 0, 0, 0, 0, 0, '2020-10-19 15:34:20', '2020-10-19 15:34:20', '2020-10-19 16:34:20', 0, 0),
(171, '2020-10-22 14:38:42', 'Nová', 0, '', '', '', 0, 0, 1, 1, 0, '2020-10-22 14:38:42', '2020-10-30 14:38:42', '2020-10-22 15:38:42', 1, 1),
(172, '2020-10-27 17:41:53', 'Nová', 0, '', '', '', 0, 0, 0, 0, 0, '2020-10-27 17:41:53', '2020-10-27 17:41:53', '2020-10-27 18:41:53', 0, 1),
(173, '2020-10-27 21:19:45', 'Nová', 0, '', '', '', 0, 0, 0, 0, 0, '2020-10-27 21:19:45', '2020-10-27 21:19:45', '2020-10-27 22:19:45', 0, 0),
(174, '2020-10-28 22:04:32', 'Nová', 0, '', '', '', 0, 0, 0, 0, 0, '2020-10-28 22:04:32', '2121-10-01 22:04:32', '2020-10-28 23:04:32', 0, 1);

-- --------------------------------------------------------

--
-- Struktura tabulky `in_events_registrations`
--

CREATE TABLE `in_events_registrations` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `event_id` int(11) NOT NULL,
  `user_id` int(50) NOT NULL,
  `confirmed` tinyint(1) NOT NULL DEFAULT 0,
  `present` tinyint(4) NOT NULL DEFAULT 0,
  `guest` tinyint(1) NOT NULL DEFAULT 0,
  `guest_name` varchar(100) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `guest_surname` varchar(100) COLLATE utf8_czech_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `in_events_registrations`
--

INSERT INTO `in_events_registrations` (`id`, `datetime`, `event_id`, `user_id`, `confirmed`, `present`, `guest`, `guest_name`, `guest_surname`) VALUES
(28, '2020-09-23 12:31:48', 157, 14, 0, 0, 0, '', ''),
(29, '2020-09-23 12:33:08', 157, 14, 0, 0, 0, '', ''),
(39, '2020-09-23 12:45:46', 158, 14, 0, 0, 0, '', ''),
(94, '2020-10-18 21:49:16', 169, 14, 0, 0, 0, '', ''),
(98, '2020-10-22 14:50:21', 171, 14, 1, 0, 0, '', '');

-- --------------------------------------------------------

--
-- Struktura tabulky `in_log`
--

CREATE TABLE `in_log` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `user` int(11) NOT NULL DEFAULT 0,
  `type` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL DEFAULT '' COMMENT 'error, warning, info',
  `role` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL DEFAULT '',
  `section` varchar(50) COLLATE utf8mb4_czech_ci NOT NULL DEFAULT '',
  `city` int(11) NOT NULL DEFAULT 0,
  `info1` varchar(1000) COLLATE utf8mb4_czech_ci NOT NULL DEFAULT '',
  `info2` varchar(1000) COLLATE utf8mb4_czech_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Vypisuji data pro tabulku `in_log`
--

INSERT INTO `in_log` (`id`, `datetime`, `user`, `type`, `role`, `section`, `city`, `info1`, `info2`) VALUES
(1, '2020-10-25 11:34:41', 13, 'Chyba', 'Admin', 'Členové', 1, 'Vytvořen: test tt (testt)', ''),
(2, '2020-10-25 11:35:27', 12, 'Informace', 'Admin', 'Členové', 1, 'Upraven: testaaa tt (testt', ''),
(3, '2020-10-25 11:35:31', 14, 'Informace', 'Admin', 'Členové', 1, 'Reset hesla: testaaa tt (testt)', ''),
(4, '2020-10-25 11:35:33', 14, 'Varování', 'Admin', 'Členové', 1, 'Smazán: testaaa tt (testt)', ''),
(5, '2020-10-24 11:43:58', 14, 'Informace', 'Admin', 'Členové', 2, 'Upraven: testX testovicX (testX', ''),
(6, '2020-10-23 11:45:58', 14, 'Informace', 'Admin', 'Členové', 3, 'Upraven: test testovic (test', 'Login: testX -> test'),
(7, '2020-10-25 11:45:58', 14, 'Informace', 'Admin', 'Členové', 3, 'Upraven: test testovic (test', 'Jméno: testX -> test'),
(8, '2020-10-25 11:45:58', 14, 'Informace', 'Admin', 'Členové', 3, 'Upraven: test testovic (test', 'Příjmení: testovicX -> testovic'),
(9, '2020-10-25 11:45:58', 14, 'Informace', 'Admin', 'Členové', 3, 'Upraven: test testovic (test', 'Škola: 2 -> 3'),
(10, '2020-10-25 11:54:55', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Login.', ''),
(11, '2020-10-27 17:31:22', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Login.', ''),
(12, '2020-10-27 17:41:53', 14, 'Informace', 'Admin', 'Události', 99, 'Vytvořena', ''),
(13, '2020-10-27 17:41:55', 14, 'Informace', 'Admin', 'Události', 0, 'Upravena: Nová (172)', 'Viditelnost: false -> true'),
(14, '2020-10-27 21:19:45', 14, 'Informace', 'Admin', 'Události', 99, 'Vytvořena', ''),
(15, '2020-10-27 22:33:14', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Logout.', ''),
(16, '2020-10-27 22:33:21', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Login.', ''),
(17, '2020-10-27 22:35:54', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Logout.', ''),
(18, '2020-10-27 22:36:13', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Login.', ''),
(19, '2020-10-28 20:25:15', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Login.', ''),
(20, '2020-10-28 22:04:32', 14, 'Informace', 'Admin', 'Události', 99, 'Vytvořena', ''),
(21, '2020-10-28 22:04:34', 14, 'Informace', 'Admin', 'Události', 0, 'Upravena: Nová (174)', 'Viditelnost: false -> true'),
(22, '2020-10-28 22:04:43', 14, 'Informace', 'Admin', 'Události', 0, 'Upravena: Nová (174)', 'Deadline: 2020-10-28 22:04:32 -> 2020-10-01 22:04:32'),
(23, '2020-10-28 22:04:59', 14, 'Informace', 'Admin', 'Události', 0, 'Upravena: Nová (174)', 'Deadline: 2020-10-01 22:04:32 -> 2121-10-01 22:04:32'),
(24, '2020-10-28 22:05:04', 14, 'Informace', 'Člen', 'Události', 99, 'Kliknutí na přihlášení: Nová (174)', ''),
(25, '2020-10-28 22:05:04', 14, 'Informace', 'Člen', 'Události', 99, 'Přihlášení na: Nová (174)', 'Limity: 0/0/0 | Autopřihlášení: false'),
(26, '2020-10-28 22:05:04', 14, 'Informace', 'Člen', 'Události', 99, 'Kliknutí na odhlášení : Nová (174)', ''),
(27, '2020-10-28 22:05:04', 14, 'Informace', 'Člen', 'Události', 99, 'Odhlášení z: Nová (174)', 'Limity: 1/0/0'),
(28, '2020-10-28 22:05:05', 14, 'Informace', 'Člen', 'Události', 99, 'Kliknutí na přihlášení: Nová (174)', ''),
(29, '2020-10-28 22:05:05', 14, 'Informace', 'Člen', 'Události', 99, 'Přihlášení na: Nová (174)', 'Limity: 0/0/0 | Autopřihlášení: false'),
(30, '2020-10-28 22:05:05', 14, 'Informace', 'Člen', 'Události', 99, 'Kliknutí na odhlášení : Nová (174)', ''),
(31, '2020-10-28 22:05:05', 14, 'Informace', 'Člen', 'Události', 99, 'Odhlášení z: Nová (174)', 'Limity: 1/0/0'),
(32, '2020-10-31 11:41:35', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Login.', ''),
(33, '2021-04-28 17:29:02', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Login.', ''),
(34, '2021-04-28 17:29:47', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Logout.', ''),
(35, '2021-04-28 17:30:21', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Login.', ''),
(36, '2021-04-28 17:30:43', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Login.', ''),
(37, '2021-04-28 17:51:22', 14, 'Informace', 'Admin', 'Nástěnka', 1, 'Vytvořen nový: test (0)', 'novy neco text...'),
(38, '2021-04-28 17:55:26', 14, 'Informace', 'Admin', 'Články', 99, 'Nový článek', ''),
(39, '2021-04-28 17:56:33', 14, 'Informace', 'Admin', 'Články', 99, 'Upraven: Nový článek (84)', 'Nové foto: ZsKastanova.png'),
(40, '2021-04-28 17:56:51', 14, 'Informace', 'Admin', 'Články', 99, 'Upraven: Nový článek (84)', 'Nové foto: trinec1.png'),
(41, '2021-04-28 17:56:51', 14, 'Informace', 'Admin', 'Články', 99, 'Upraven: Nový článek (84)', 'Nové foto: trinec0.png'),
(42, '2021-04-28 17:57:39', 14, 'Informace', 'Admin', 'Články', 99, 'Změna viditelnosti fota: Nový článek (84)', 'Foto: /gallery/84/trinec0.png'),
(43, '2021-04-28 17:57:40', 14, 'Informace', 'Admin', 'Články', 99, 'Změna viditelnosti fota: Nový článek (84)', 'Foto: /gallery/84/trinec0.png'),
(44, '2021-04-28 17:57:41', 14, 'Informace', 'Admin', 'Články', 99, 'Změna viditelnosti fota: Nový článek (84)', 'Foto: /gallery/84/trinec0.png'),
(45, '2021-04-28 17:57:42', 14, 'Informace', 'Admin', 'Články', 99, 'Změna viditelnosti fota: Nový článek (84)', 'Foto: /gallery/84/trinec1.png'),
(46, '2021-04-28 17:57:43', 14, 'Informace', 'Admin', 'Články', 99, 'Změna viditelnosti fota: Nový článek (84)', 'Foto: /gallery/84/trinec1.png'),
(47, '2021-04-28 17:57:44', 14, 'Informace', 'Admin', 'Články', 99, 'Změna viditelnosti fota: Nový článek (84)', 'Foto: /gallery/84/trinec0.png'),
(48, '2021-04-28 17:58:09', 14, 'Chyba', 'Admin', 'Články', 99, 'Chyba při mazání: Nový článek (84)', '[object Object]'),
(49, '2021-09-02 11:11:03', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Login.', ''),
(50, '2021-09-08 07:38:53', 14, 'Informace', 'Člen', 'Přihlašování', 99, 'Login.', '');

-- --------------------------------------------------------

--
-- Struktura tabulky `in_members`
--

CREATE TABLE `in_members` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `login` varchar(30) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `pwd` varchar(200) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `name` varchar(30) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `surname` varchar(30) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `school` int(11) NOT NULL DEFAULT 0 COMMENT '0-all,1-ostrava,2-trinec, 3-tesin',
  `news` varchar(5000) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `logged` datetime NOT NULL DEFAULT '1991-06-13 12:00:00',
  `admin` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `in_members`
--

INSERT INTO `in_members` (`id`, `datetime`, `login`, `pwd`, `name`, `surname`, `school`, `news`, `logged`, `admin`) VALUES
(14, '2020-09-11 18:58:03', 'ondmic', '$2y$10$jBwemoQlBM505n/Wcp/ICOIdvt2WW3SKsd4GVy9GpKeVIceXjTQ5W', 'Ondřej', 'Michejda', 0, '', '2021-09-08 07:38:53', 1),
(163, '2020-10-04 11:31:10', 'petwal', '$2y$10$eCg3kWY0i/RL2t6YREepkuW9DgpDbAA56FU7QrAiEh0j5GnZ12ysC', 'Petr', 'Walaski', 1, '', '1991-06-13 12:00:00', 0),
(164, '2020-10-04 15:56:07', 'test', '$2y$10$RJlCa/sbHdhX8XeX7NASHusISWiPPVgf.tZIafN4O4cQHmtHP2xjq', 'test', 'testovic', 3, '', '2020-10-16 14:43:02', 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `in_noticeboard`
--

CREATE TABLE `in_noticeboard` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `school` int(11) NOT NULL DEFAULT 0,
  `head` varchar(100) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `text` varchar(10000) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `color` varchar(10) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `visible` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `in_noticeboard`
--

INSERT INTO `in_noticeboard` (`id`, `datetime`, `school`, `head`, `text`, `color`, `visible`) VALUES
(113, '2020-10-16 17:33:58', 4, 'ter', '<p>test</p>', '', 1),
(117, '2021-04-28 17:51:22', 1, 'test', '<p>novy neco text</p>', '', 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `in_videos`
--

CREATE TABLE `in_videos` (
  `id` int(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp(),
  `name` varchar(100) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `category` int(11) NOT NULL DEFAULT 0 COMMENT '1-forma, 2-principy, 3-trenink, 4-ostatni',
  `description` varchar(5000) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `link` varchar(5000) COLLATE utf8_czech_ci NOT NULL DEFAULT '',
  `visible` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

--
-- Vypisuji data pro tabulku `in_videos`
--

INSERT INTO `in_videos` (`id`, `datetime`, `name`, `category`, `description`, `link`, `visible`) VALUES
(10, '2020-09-24 15:26:05', 'První forma Wing Tsun - Siu Nim Tao (Malá myšlenka)', 3, 'Video slouží k orientaci v postupu technik ve formě, nikoliv k detailnímu nácviku.', 'https://youtu.be/Ttca8BmFfq8', 1),
(11, '2020-09-24 15:26:05', 'Druhá forma Wing Tsun - Chum Kiu (Hledání mostu)', 1, 'Video slouží k orientaci v postupu technik ve formě, nikoliv k detailnímu nácviku.', 'https://youtu.be/HwVTdukbUnQ', 1),
(14, '2020-09-24 15:26:05', 'Sifu Chris Collins, Všechno je spirála', 2, '', 'https://youtu.be/81vCyIyknH8', 1),
(15, '2020-09-24 15:26:05', 'Sifu Chris Collins, útok s nadhozem z 1 sekce', 2, '', 'https://youtu.be/GL_Ho3Zg-zU', 1),
(16, '2020-09-24 15:26:05', 'Sifu Chris Collins, Gan Sau', 2, '', 'https://youtu.be/mfiGmQNbpY4', 1),
(17, '2020-09-24 15:26:05', 'Sifu Chris Collins, Gwat Sau', 2, '', 'https://youtu.be/oZSW1lX_Iaw', 1),
(18, '2020-09-24 15:26:05', 'Sifu Chris Collins, konstantní útok a obrana', 2, '', 'https://youtu.be/8VnIRsCRqVY', 1),
(19, '2020-09-24 15:26:05', 'Sifu Chris Collins, přemostění a vzdálenost', 2, '', 'https://youtu.be/iW9UUAbd1WE', 1),
(20, '2020-09-24 15:26:05', 'Wing Tsun Slezsko, Letní kemp Jeseník nad Odrou 2019', 4, '', 'https://youtu.be/ScN74XpsWhU', 1),
(23, '2020-10-19 15:12:02', 'Nové videoX', 4, '', '', 1);

--
-- Klíče pro exportované tabulky
--

--
-- Klíče pro tabulku `ex_articles`
--
ALTER TABLE `ex_articles`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `ex_article_img`
--
ALTER TABLE `ex_article_img`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `in_chat`
--
ALTER TABLE `in_chat`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `in_equipment`
--
ALTER TABLE `in_equipment`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `in_equipment_orders`
--
ALTER TABLE `in_equipment_orders`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `in_events`
--
ALTER TABLE `in_events`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `in_events_registrations`
--
ALTER TABLE `in_events_registrations`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `in_log`
--
ALTER TABLE `in_log`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `in_members`
--
ALTER TABLE `in_members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `login` (`login`);

--
-- Klíče pro tabulku `in_noticeboard`
--
ALTER TABLE `in_noticeboard`
  ADD PRIMARY KEY (`id`);

--
-- Klíče pro tabulku `in_videos`
--
ALTER TABLE `in_videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `ex_articles`
--
ALTER TABLE `ex_articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT pro tabulku `ex_article_img`
--
ALTER TABLE `ex_article_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=198;

--
-- AUTO_INCREMENT pro tabulku `in_chat`
--
ALTER TABLE `in_chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `in_equipment`
--
ALTER TABLE `in_equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pro tabulku `in_equipment_orders`
--
ALTER TABLE `in_equipment_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT pro tabulku `in_events`
--
ALTER TABLE `in_events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175;

--
-- AUTO_INCREMENT pro tabulku `in_events_registrations`
--
ALTER TABLE `in_events_registrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT pro tabulku `in_log`
--
ALTER TABLE `in_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pro tabulku `in_members`
--
ALTER TABLE `in_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT pro tabulku `in_noticeboard`
--
ALTER TABLE `in_noticeboard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;

--
-- AUTO_INCREMENT pro tabulku `in_videos`
--
ALTER TABLE `in_videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
