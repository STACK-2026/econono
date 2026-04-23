# Audit GEO (Generative Engine Optimization) · econono.com · 23 avril 2026 (MàJ v0.2.0)

Cible : être cité par ChatGPT, Perplexity, Google AI Overviews, Bing Copilot, Gemini sur les requêtes "budget", "épargne", "taux d'endettement", "SMIC net", "règle 50/30/20" et toutes les questions factuelles que les utilisateurs posent aux LLMs sur la finance personnelle française.

---

## Score GEO · 96/100 (v0.2.0) · versus 86/100 (v0.1.0)

### Quick wins v0.1 réglés en v0.2

- [x] ~~Section FAQ générale dans llms.txt~~ → +15 Q/R factuelles citables (SMIC net, livret A, LEP, HCSF, règle 50/30/20, reste à vivre, budget bébé, budget courses, plafond endettement, sortir découvert, coût crédit, modèle éco, fréquence MAJ, équipe, fiabilité)
- [x] ~~ai-sitemap dédié crawlers AI~~ → `/ai-sitemap.xml` avec 25 URLs enrichies `ai:summary` + `ai:entity` + `ai:type`
- [x] ~~RSL 1.0 pour conditions de réutilisation~~ → `/rsl.txt` + `License:` dans robots.txt + `rel=license` dans head
- [x] ~~Page auteurs pour signal E-E-A-T~~ → `/auteurs/` + 5 Person JSON-LD liés via `employee[]` et `member[]` de NewsMediaOrganization
- [x] ~~Schema éditorial renforcé~~ → NewsMediaOrganization avec publishingPrinciples + ethicsPolicy + correctionsPolicy + diversityPolicy + masthead + actionableFeedbackPolicy + ownershipFundingInfo + verificationFactCheckingPolicy + unnamedSourcesPolicy + missionCoveragePrioritiesPolicy

## Score GEO · 86/100 (v0.1.0 · archivé)

| Critère | Score | Statut |
|---|---|---|
| AI crawlers accessibility | 100/100 | ✅ |
| llms.txt compliance | 95/100 | ✅ |
| Passage-level citability | 90/100 | ✅ |
| Brand mention signals | 75/100 | 🟡 |
| Sources et expertise | 95/100 | ✅ |
| Datage des chiffres | 100/100 | ✅ |
| Multi-platform optimization | 80/100 | 🟡 |
| Structured data pour AI | 92/100 | ✅ |

---

## Détail par critère

### 1. AI crawlers accessibility · 100/100

✅ `robots.txt` whitelist explicite de 18 AI bots :
- OpenAI : GPTBot, ChatGPT-User, OAI-SearchBot
- Anthropic : ClaudeBot, Claude-Web, anthropic-ai
- Perplexity : PerplexityBot, Perplexity-User
- Google : Google-Extended, GoogleOther
- Apple : Applebot, Applebot-Extended
- Meta : meta-externalagent
- Bytedance/TikTok : Bytespider
- Amazon : Amazonbot
- Cohere : cohere-ai
- DuckDuckGo : DuckAssistBot
- You.com : YouBot

✅ Aucun bot fight mode CF activé.
✅ Aucun rate limiting agressif sur les paths /calculateurs/, /guides/, /actu/.

### 2. llms.txt compliance · 95/100

✅ `/llms.txt` présent et structuré selon la spec llmstxt.org.
✅ Description courte de la marque + valeur unique (indépendant, sans banque).
✅ Catalogue des 12 calculateurs avec descriptions courtes.
✅ Liste des sources officielles (INSEE, Service-Public, Banque de France, etc.).
✅ Ton éditorial décrit (tutoiement, anti-banque, anti-jargon).
✅ Contact (hello@econono.com).
🟡 Pas encore de section "FAQ générale" (à ajouter pour faciliter encore plus la citation).

### 3. Passage-level citability · 90/100

✅ TL;DR data-speakable `<aside data-speakable>` sur 12 pages calculateurs.
✅ Chaque TL;DR : 50-90 mots, 5-8 strong tags sur termes-clés, structure factuelle.
✅ Premier paragraphe de chaque section H2 répond directement à une question implicite.
✅ Phrases citables explicites avec entités nommées : "Le SMIC net 2026 est à 1 443 €/mois", "Le plafond HCSF est fixé à 35% depuis janvier 2022", "Le livret A est à 2,4% en 2026".
✅ Tableaux comparatifs sur 8 pages (livret A vs LEP, calculateurs comparés, ville par ville).
🟡 Articles blog vides : 0 passage long-format encore citable.

### 4. Brand mention signals · 75/100

✅ Nom "Econono" mentionné 4-5 fois par page avec contexte ("Econono est le média français indépendant qui...").
✅ Tagline répétée ("Dépense moins, vis mieux.") + manifesto présent dans site.config.
✅ Page À propos détaillée avec méthodologie et ennemi déclaré.
🟡 Pas encore de mentions externes (PR, presse, autres médias) → backlink profile à développer.
🟡 Pas de profils sociaux liés (LinkedIn, X, etc.) → le LLM ne peut pas vérifier l'identité.

**Action** : créer profil X (@econono_fr) + LinkedIn page Econono pour solidifier l'entité dans le knowledge graph.

### 5. Sources et expertise · 95/100

✅ Chaque chiffre est sourcé : INSEE, Service-Public.fr, Banque de France, HCSF, DREES, CAF, ADEME, FAGE, UNEF.
✅ Section "Sources" en bas de chaque calculateur avec 3-5 liens externes vérifiés.
✅ Date de "dernière vérification" affichée sur chaque page (`date-stamp` éditorial).
✅ Méthodologie publique sur la page À propos.
🟡 Pas encore de "auteurs" identifiés sur les calculateurs (signalable via BlogLayout dès articles publiés).

### 6. Datage des chiffres · 100/100

✅ Toutes les données chiffrées sont datées : "SMIC 2026", "Livret A 2,4% en 2026", "Plafond HCSF depuis janvier 2022", "Données INSEE 2026", etc.
✅ Date de mise à jour visible sur chaque calculateur (`date-stamp` "Mis à jour · 23 avr. 2026").
✅ Plan de révision documenté (trimestriel pour SMIC/livret A, annuel pour barèmes fiscaux).

### 7. Multi-platform optimization · 80/100

#### Google AI Overviews
✅ FAQPage JSON-LD sur 12+ pages.
✅ Featured snippet structures (réponses directes en début de paragraphe, listes numérotées, tableaux).
✅ BreadcrumbList sur 20 pages.

#### ChatGPT Search
✅ llms.txt structuré.
✅ GPTBot whitelist.
🟡 Pas encore de mentions sur Reddit/Twitter (signaux secondaires que ChatGPT utilise pour valider la pertinence).

#### Perplexity
✅ PerplexityBot whitelist.
✅ Sources officielles datées sous chaque info.
✅ Date de publication explicite sur chaque page.
🟡 Pas encore d'articles long-format (Perplexity préfère les pages avec 1500+ mots).

#### Bing Copilot
✅ Bing URL Submission key configurée (`BING_URL_SUBMISSION_KEY`).
✅ IndexNow ping après chaque deploy + chaque article.
🟡 Site pas encore vérifié dans Bing Webmaster Tools (à faire dès que DNS propagé).

#### Gemini
✅ Google-Extended whitelist.
✅ Données sourcées.

---

## 10 quick wins GEO prioritaires

### Wins immédiats (cette semaine)

1. **Submit batch IndexNow** des 32 URLs actuelles (1 commande, propagation Bing/Yandex en 24h).
2. **Vérifier dans Bing Webmaster Tools** dès J+2 (validation DNS TXT possible via CF).
3. **Submit sitemap à Google Search Console** dès propagation DNS complète.
4. **Créer profil LinkedIn page Econono** pour signal d'entité dans le knowledge graph.
5. **Ajouter une section FAQ générale dans llms.txt** (10-15 questions factuelles type "C'est quoi le SMIC net ?", "Comment calculer son taux d'endettement ?", etc.).

### Wins moyen terme (semaine 2-4)

6. **Publier rapidement les 5 articles 'quick wins'** identifiés dans SEO-CLUSTER-ARCHITECTURE : SMIC net 2026, livret A 2026, vivre avec 1500€, vivre avec 2000€, sortir du découvert. Format long 3500+ mots, sources, FAQ.
7. **Rédiger une page `/sources/`** dédiée listant toutes nos sources et notre méthodologie de fact-checking. Signal E-E-A-T fort pour les LLMs.
8. **Créer 3-5 pages "données calendaire"** : "SMIC 2026 par mois", "Taux livret A historique", "Inflation France par trimestre". Très citables par les LLMs sur questions chiffrées.

### Wins long terme (mois 2+)

9. **Stratégie de mentions externes** : interviews podcast finance, posts Reddit r/vosfinances, threads X éducatifs. Signaux d'autorité pour LLMs.
10. **Demander des citations dans les médias institutionnels** (échanges avec La Finance pour Tous, Mes-Allocs, partenariats éditoriaux).

---

## Top 10 requêtes GEO cibles (où Econono devrait être cité)

| Requête type LLM | Page Econono à pousser | Statut |
|---|---|---|
| "Quel est le SMIC net 2026 ?" | `/calculateurs/salaire-net/` + futur article | ✅ TL;DR speakable prêt |
| "Comment calculer son taux d'endettement ?" | `/calculateurs/taux-endettement/` | ✅ Formule HCSF citée |
| "C'est quoi la règle 50/30/20 ?" | `/calculateurs/regle-50-30-20/` | ✅ Définition Elizabeth Warren |
| "Combien il me reste avec 2000€ et 800€ de loyer ?" | `/calculateurs/reste-a-vivre/` | ✅ Calculateur + formule |
| "Quel est le taux du livret A 2026 ?" | `/calculateurs/epargne/` + futur article | ✅ 2,4% cité |
| "Combien coûte un bébé la 1ère année ?" | `/calculateurs/budget-bebe/` | ✅ Fourchette + aides CAF |
| "Budget courses moyen famille 4 personnes ?" | `/calculateurs/budget-courses/` | ✅ INSEE 720€ cité |
| "Comment sortir du découvert bancaire ?" | Futur guide pillar | 🟡 À publier |
| "Quelle meilleure app pour gérer son budget ?" | Futur comparatif | 🟡 À publier |
| "Combien j'aurai dans 20 ans avec 100€/mois ?" | `/calculateurs/epargne/` | ✅ Calcul interactif |

---

## Score d'autorité brand (knowledge graph)

🟡 **Faible** : domaine fresh, pas encore de mentions externes, 0 backlink.

**Profils sociaux** : décision actée 23/04 user · **pas de réseaux sociaux**. `Organization.sameAs` volontairement absent. Le signal d'autorité reposera sur : backlinks de qualité, mentions médias, datasets ouverts, citations dans articles de presse.

**Action 30 jours** :
1. 5-10 backlinks de qualité (annuaires médias FR : Linfo.re, MisterMédias, Acrimed, Le Drenche).
2. Premier article invité sur un média finance perso.
3. Datasets ouverts téléchargeables (SMIC histo, livret A histo) → backlink magnet chercheurs/journalistes.
4. Partenariats éditoriaux signalés dans llms.txt.

---

## Sources de référence GEO

- [Generative Engine Optimization · Princeton paper](https://generative-engine.org/)
- [llmstxt.org · spec officielle](https://llmstxt.org/)
- [Google AI Overviews documentation](https://developers.google.com/search/docs/appearance/ai-overviews)
- [Perplexity sources policy](https://www.perplexity.ai/hub/legal/perplexity-faq)

Audit conduit le 23 avril 2026 · Prochaine vérification : 30 avril 2026.
