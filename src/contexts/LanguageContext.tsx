import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "tl";

interface Translations {
  [key: string]: {
    en: string;
    tl: string;
  };
}

const translations: Translations = {
  // Navigation
  "nav.home": { en: "Home", tl: "Tahanan" },
  "nav.marketplace": { en: "Marketplace", tl: "Pamilihan" },
  "nav.about": { en: "About Us", tl: "Tungkol Sa Amin" },
  "nav.sellProduct": { en: "Sell Product", tl: "Magbenta ng Produkto" },
  "nav.login": { en: "Login", tl: "Mag-login" },
  "nav.logout": { en: "Logout", tl: "Mag-logout" },
  "nav.myOrders": { en: "My Orders", tl: "Aking mga Order" },
  "nav.cart": { en: "Cart", tl: "Cart" },
  "nav.admin": { en: "Admin Panel", tl: "Admin Panel" },
  "nav.signUp": { en: "Sign Up / Login", tl: "Mag-sign Up / Mag-login" },
  "nav.continueShopping": { en: "Continue Shopping", tl: "Magpatuloy sa Pamimili" },
  
  // Hero Section
  "hero.title1": { en: "Smart Solution", tl: "Matalinong Solusyon" },
  "hero.title2": { en: "for a Stronger", tl: "para sa mas Malakas na" },
  "hero.title3": { en: "Agriculture", tl: "Agrikultura" },
  "hero.subtitle": { en: "Connecting farmers and consumers through a modern marketplace that supports sustainable agriculture and strengthens local communities.", tl: "Nag-uugnay ng mga magsasaka at mamimili sa pamamagitan ng modernong pamilihan na sumusuporta sa napapanatiling agrikultura at nagpapalakas ng lokal na komunidad." },
  "hero.exploreMarketplace": { en: "Explore Marketplace", tl: "Tuklasin ang Pamilihan" },
  "hero.learnMore": { en: "Learn More", tl: "Matuto Pa" },
  "hero.chatBot": { en: "Chat Bot", tl: "Chat Bot" },
  
  // Marketplace Section
  "marketplace.sectionTitle": { en: "Marketplace", tl: "Pamilihan" },
  "marketplace.description": { en: "Discover fresh and local farm products. Connect with sellers directly and support the agricultural community. From farm to table, ensuring quality and sustainability in every purchase.", tl: "Tuklasin ang sariwang lokal na produkto mula sa bukid. Makipag-ugnayan direkta sa mga nagbebenta at suportahan ang komunidad ng agrikultura. Mula sa bukid hanggang mesa, sinisiguro ang kalidad at sustainability sa bawat bili." },
  "marketplace.vegetables": { en: "Fresh Vegetables", tl: "Sariwang Gulay" },
  "marketplace.vegetablesDesc": { en: "Farm-fresh produce delivered daily", tl: "Sariwang produkto mula sa bukid, inihahain araw-araw" },
  "marketplace.fruits": { en: "Fresh Fruits", tl: "Sariwang Prutas" },
  "marketplace.fruitsDesc": { en: "Seasonal fruits from local farms", tl: "Mga seasonal na prutas mula sa lokal na bukid" },
  "marketplace.livestock": { en: "Livestock", tl: "Hayop" },
  "marketplace.livestockDesc": { en: "Quality livestock from trusted farmers", tl: "De-kalidad na hayop mula sa pinagkakatiwalaang magsasaka" },
  "marketplace.grain": { en: "Grain Products", tl: "Produktong Butil" },
  "marketplace.grainDesc": { en: "Premium grains and cereals", tl: "Premium na butil at sireal" },
  
  // About Section
  "about.badge": { en: "About us", tl: "Tungkol sa amin" },
  "about.title1": { en: "Making Farming", tl: "Ginagawang mas Madali" },
  "about.title2": { en: "Easier and Better", tl: "at mas Mahusay ang Pagsasaka" },
  "about.description": { en: "BCFIAC is dedicated to empowering farmers through technology and community support. We connect local agricultural producers with consumers, creating a sustainable marketplace that benefits everyone in the agricultural value chain.", tl: "Ang BCFIAC ay nakatuon sa pagbibigay-kapangyarihan sa mga magsasaka sa pamamagitan ng teknolohiya at suporta ng komunidad. Kami ay nag-uugnay ng mga lokal na produktor ng agrikultura sa mga mamimili, lumilikha ng sustainable na pamilihan na makikinabang sa lahat sa agricultural value chain." },
  "about.benefit1": { en: "Direct Farm Access", tl: "Direktang Access sa Bukid" },
  "about.benefit1Desc": { en: "Connect directly with local farmers and get the freshest produce", tl: "Makipag-ugnayan direkta sa mga lokal na magsasaka at makakuha ng pinakasariwang produkto" },
  "about.benefit2": { en: "Quality Assurance", tl: "Garantisadong Kalidad" },
  "about.benefit2Desc": { en: "Every product is carefully vetted for quality and sustainability", tl: "Bawat produkto ay maingat na sinusuri para sa kalidad at sustainability" },
  "about.benefit3": { en: "Community Support", tl: "Suporta sa Komunidad" },
  "about.benefit3Desc": { en: "Support local farmers and strengthen agricultural communities", tl: "Suportahan ang mga lokal na magsasaka at palakasin ang mga komunidad ng agrikultura" },
  "about.benefit4": { en: "Sustainable Farming", tl: "Sustainable na Pagsasaka" },
  "about.benefit4Desc": { en: "Promoting eco-friendly and sustainable farming practices", tl: "Pagsusulong ng eco-friendly at sustainable na pag-practice sa pagsasaka" },
  
  // FAQ Section
  "faq.badge": { en: "FAQ", tl: "FAQ" },
  "faq.title1": { en: "Making Farming Easier", tl: "Ginagawang mas Madali ang Pagsasaka" },
  "faq.title2": { en: "and Better", tl: "at mas Mahusay" },
  "faq.description": { en: "Find answers to common questions about our agricultural marketplace platform", tl: "Maghanap ng mga sagot sa karaniwang tanong tungkol sa aming platform ng pamilihan ng agrikultura" },
  "faq.gettingStarted": { en: "Getting Started", tl: "Pagsisimula" },
  "faq.buyingProcess": { en: "Buying Process", tl: "Proseso ng Pagbili" },
  "faq.qualitySafety": { en: "Quality & Safety", tl: "Kalidad at Kaligtasan" },
  "faq.sellerSupport": { en: "Seller Support", tl: "Suporta sa Nagbebenta" },
  
  // Footer
  "footer.description": { en: "Empowering farmers through technology and community support. Building stronger agricultural communities for a sustainable future.", tl: "Pagbibigay-kapangyarihan sa mga magsasaka sa pamamagitan ng teknolohiya at suporta ng komunidad. Pagbuo ng mas malakas na mga komunidad ng agrikultura para sa sustainable na kinabukasan." },
  "footer.boardOfDirectors": { en: "Board of Directors", tl: "Lupon ng mga Direktor" },
  "footer.officers": { en: "Officers", tl: "Mga Opisyal" },
  "footer.auditElection": { en: "Audit & Election", tl: "Audit at Halalan" },
  "footer.committees": { en: "Committees", tl: "Mga Komite" },
  "footer.tagline": { en: "Smart Solution for a Stronger Agriculture", tl: "Matalinong Solusyon para sa mas Malakas na Agrikultura" },
  "footer.privacy": { en: "Privacy Policy", tl: "Patakaran sa Privacy" },
  "footer.terms": { en: "Terms of Service", tl: "Mga Tuntunin ng Serbisyo" },
  "footer.contact": { en: "Contact Us", tl: "Makipag-ugnayan" },
  "footer.copyright": { en: "© 2024 BCFIAC. All rights reserved.", tl: "© 2024 BCFIAC. Lahat ng karapatan ay nakalaan." },
  
  // Product Card
  "product.view": { en: "View", tl: "Tingnan" },
  "product.addToCart": { en: "Add to Cart", tl: "Idagdag sa Cart" },
  "product.outOfStock": { en: "Out of stock", tl: "Ubos na" },
  "product.inStock": { en: "in stock", tl: "nasa stock" },
  "product.by": { en: "by", tl: "ni" },
  
  // Cart
  "cart.title": { en: "Shopping Cart", tl: "Cart ng Pamimili" },
  "cart.empty": { en: "Your cart is empty", tl: "Walang laman ang iyong cart" },
  "cart.emptyDesc": { en: "Add some products to get started!", tl: "Magdagdag ng mga produkto para magsimula!" },
  "cart.browseProducts": { en: "Browse Products", tl: "Mag-browse ng mga Produkto" },
  "cart.continueShopping": { en: "Continue Shopping", tl: "Magpatuloy sa Pamimili" },
  "cart.soldBy": { en: "Sold by", tl: "Ibinebenta ni" },
  "cart.orderSummary": { en: "Order Summary", tl: "Buod ng Order" },
  "cart.subtotal": { en: "Subtotal", tl: "Subtotal" },
  "cart.items": { en: "items", tl: "mga item" },
  "cart.shipping": { en: "Shipping", tl: "Shipping" },
  "cart.shippingNote": { en: "Calculated at checkout", tl: "Kakalkulahin sa checkout" },
  "cart.shippingTax": { en: "Shipping and taxes calculated at checkout", tl: "Shipping at buwis kakalkulahin sa checkout" },
  "cart.total": { en: "Total", tl: "Kabuuan" },
  "cart.checkout": { en: "Proceed to Checkout", tl: "Magpatuloy sa Checkout" },
  "cart.each": { en: "each", tl: "bawat isa" },
  
  // Checkout
  "checkout.title": { en: "Checkout", tl: "Checkout" },
  "checkout.backToCart": { en: "Back to Cart", tl: "Bumalik sa Cart" },
  "checkout.shippingInfo": { en: "Shipping Information", tl: "Impormasyon ng Paghahatid" },
  "checkout.contactInfo": { en: "Contact Information", tl: "Impormasyon ng Kontak" },
  "checkout.fullName": { en: "Full Name", tl: "Buong Pangalan" },
  "checkout.phone": { en: "Phone Number", tl: "Numero ng Telepono" },
  "checkout.address": { en: "Street Address", tl: "Address ng Kalye" },
  "checkout.city": { en: "City", tl: "Lungsod" },
  "checkout.province": { en: "Province", tl: "Probinsya" },
  "checkout.zipCode": { en: "Zip Code", tl: "Zip Code" },
  "checkout.deliveryNotes": { en: "Delivery Notes (Optional)", tl: "Mga Tala sa Paghahatid (Opsyonal)" },
  "checkout.pickupNotes": { en: "Pick-up Notes (Optional)", tl: "Mga Tala sa Pick-up (Opsyonal)" },
  "checkout.paymentMethod": { en: "Payment Method", tl: "Paraan ng Pagbabayad" },
  "checkout.gcash": { en: "GCash Payment", tl: "Pagbabayad sa GCash" },
  "checkout.gcashDesc": { en: "Pay securely using GCash", tl: "Magbayad nang ligtas gamit ang GCash" },
  "checkout.cod": { en: "Cash on Delivery", tl: "Cash on Delivery" },
  "checkout.codDesc": { en: "Pay when you receive your order", tl: "Magbayad kapag natanggap mo ang iyong order" },
  "checkout.pickup": { en: "Pick-up at Seller Location", tl: "Pick-up sa Lokasyon ng Nagbebenta" },
  "checkout.pickupDesc": { en: "Arrange pick-up directly with seller - No delivery fee", tl: "Ayusin ang pick-up direkta sa nagbebenta - Walang bayad sa delivery" },
  "checkout.orderSummary": { en: "Order Summary", tl: "Buod ng Order" },
  "checkout.subtotal": { en: "Subtotal", tl: "Subtotal" },
  "checkout.shippingFee": { en: "Shipping Fee", tl: "Bayad sa Shipping" },
  "checkout.toCalculate": { en: "To be calculated", tl: "Kakalkulahin" },
  "checkout.total": { en: "Total", tl: "Kabuuan" },
  "checkout.placeOrder": { en: "Place Order", tl: "Ilagay ang Order" },
  "checkout.processing": { en: "Processing...", tl: "Pinoproseso..." },
  "checkout.termsAgree": { en: "By placing this order, you agree to our Terms & Conditions", tl: "Sa paglalagay ng order na ito, sumasang-ayon ka sa aming Mga Tuntunin at Kondisyon" },
  
  // Orders
  "orders.title": { en: "My Orders", tl: "Aking mga Order" },
  "orders.trackManage": { en: "Track and manage your orders", tl: "Subaybayan at pamahalaan ang iyong mga order" },
  "orders.noOrders": { en: "No orders yet", tl: "Wala pang order" },
  "orders.noOrdersDesc": { en: "Start shopping to see your orders here", tl: "Magsimulang mamili para makita ang iyong mga order dito" },
  "orders.browseProducts": { en: "Browse Products", tl: "Mag-browse ng mga Produkto" },
  "orders.backToMarketplace": { en: "Back to Marketplace", tl: "Bumalik sa Pamilihan" },
  "orders.orderNumber": { en: "Order", tl: "Order" },
  "orders.placedOn": { en: "Placed on", tl: "Inilagay noong" },
  "orders.shippingAddress": { en: "Shipping Address", tl: "Address ng Paghahatid" },
  "orders.orderItems": { en: "Order Items", tl: "Mga Item ng Order" },
  "orders.soldBy": { en: "Sold by", tl: "Ibinebenta ni" },
  "orders.qty": { en: "Qty", tl: "Dami" },
  "orders.totalAmount": { en: "Total Amount", tl: "Kabuuang Halaga" },
  "orders.message": { en: "Message", tl: "Mensahe" },
  "orders.contactAdmin": { en: "Contact Admin", tl: "Makipag-ugnayan sa Admin" },
  "orders.sendMessage": { en: "Send Message", tl: "Magpadala ng Mensahe" },
  "orders.messagePrompt": { en: "Type your message here...", tl: "I-type ang iyong mensahe dito..." },
  
  // Admin
  "admin.title": { en: "AgriVerse Admin", tl: "AgriVerse Admin" },
  "admin.subtitle": { en: "Manage your platform efficiently", tl: "Pamahalaan ang iyong platform nang epektibo" },
  "admin.totalUsers": { en: "Total Users", tl: "Kabuuang mga User" },
  "admin.registeredAccounts": { en: "Registered accounts", tl: "Mga nakarehistrong account" },
  "admin.totalProducts": { en: "Total Products", tl: "Kabuuang mga Produkto" },
  "admin.listedMarketplace": { en: "Listed in marketplace", tl: "Nakalista sa pamilihan" },
  "admin.pendingProducts": { en: "Pending Products", tl: "Nakabinbing mga Produkto" },
  "admin.awaitingApproval": { en: "Awaiting approval", tl: "Naghihintay ng pag-apruba" },
  "admin.totalOrders": { en: "Total Orders", tl: "Kabuuang mga Order" },
  "admin.completedTransactions": { en: "Completed transactions", tl: "Mga natapos na transaksyon" },
  "admin.manageUsers": { en: "Manage Users", tl: "Pamahalaan ang mga User" },
  "admin.productApproval": { en: "Product Approval", tl: "Pag-apruba ng Produkto" },
  "admin.announcements": { en: "Announcements", tl: "Mga Anunsyo" },
  "admin.userManagement": { en: "User Management", tl: "Pamamahala ng User" },
  "admin.userManagementDesc": { en: "View and manage user roles across the platform", tl: "Tingnan at pamahalaan ang mga role ng user sa platform" },
  "admin.email": { en: "Email", tl: "Email" },
  "admin.fullName": { en: "Full Name", tl: "Buong Pangalan" },
  "admin.currentRole": { en: "Current Role", tl: "Kasalukuyang Role" },
  "admin.changeRole": { en: "Change Role", tl: "Baguhin ang Role" },
  "admin.productApprovalTitle": { en: "Product Approval", tl: "Pag-apruba ng Produkto" },
  "admin.productApprovalDesc": { en: "Review and manage product submissions", tl: "Suriin at pamahalaan ang mga isinumite na produkto" },
  "admin.productName": { en: "Product Name", tl: "Pangalan ng Produkto" },
  "admin.seller": { en: "Seller", tl: "Nagbebenta" },
  "admin.category": { en: "Category", tl: "Kategorya" },
  "admin.price": { en: "Price", tl: "Presyo" },
  "admin.status": { en: "Status", tl: "Katayuan" },
  "admin.actions": { en: "Actions", tl: "Mga Aksyon" },
  "admin.approve": { en: "Approve", tl: "Aprubahan" },
  "admin.reject": { en: "Reject", tl: "Tanggihan" },
  "admin.delete": { en: "Delete", tl: "Tanggalin" },
  "admin.noUsers": { en: "No users found", tl: "Walang natagpuang user" },
  "admin.noProducts": { en: "No products found", tl: "Walang natagpuang produkto" },
  
  // About Page
  "aboutPage.badge": { en: "About Us", tl: "Tungkol Sa Amin" },
  "aboutPage.heroTitle1": { en: "Banaba Cerca Farmers & Irrigators", tl: "Banaba Cerca Farmers & Irrigators" },
  "aboutPage.heroTitle2": { en: "Agriculture Cooperative", tl: "Agriculture Cooperative" },
  "aboutPage.heroDesc": { en: "A community of dedicated farmers from Brgy. Banaba Cerca, Indang, Cavite, united by a shared vision for progress, sustainable livelihood, and agricultural excellence.", tl: "Isang komunidad ng dedikadong mga magsasaka mula sa Brgy. Banaba Cerca, Indang, Cavite, nagkakaisa sa iisang bisyon para sa kaunlaran, sustainable na kabuhayan, at kahusayan sa agrikultura." },
  "aboutPage.whoWeAre": { en: "Who We Are", tl: "Sino Kami" },
  "aboutPage.whoWeAreDesc": { en: "Founded in November 2019, BCFIA began with 43 pioneering members who believed in the power of unity and cooperation. What started as a local gathering of farmers has grown into a formally recognized association committed to improving agricultural productivity and strengthening our community.", tl: "Itinatag noong Nobyembre 2019, nagsimula ang BCFIA sa 43 na pioneer na miyembro na naniwala sa kapangyarihan ng pagkakaisa at kooperasyon. Ang nagsimula bilang lokal na pagtitipon ng mga magsasaka ay lumago sa isang pormal na kinikilalang asosasyon na nakatuon sa pagpapabuti ng produktibidad ng agrikultura at pagpapalakas ng aming komunidad." },
  "aboutPage.doleRegistered": { en: "DOLE Registered (2020)", tl: "Nakarehistro sa DOLE (2020)" },
  "aboutPage.secRegistered": { en: "SEC Registered (2023)", tl: "Nakarehistro sa SEC (2023)" },
  "aboutPage.location": { en: "Indang, Cavite", tl: "Indang, Cavite" },
  "aboutPage.visionTitle": { en: "Our Vision", tl: "Aming Bisyon" },
  "aboutPage.visionDesc": { en: "A strong and prosperous cooperative in the field of agriculture that promotes adequate livelihood, sustainable farming, and unity of members towards a bountiful community.", tl: "Isang matatag at maunlad na kooperatiba sa larangan ng agrikultura na nagtataguyod ng sapat na kabuhayan, likas-kayang pagsasaka, at pagkakaisa ng mga kasapi tungo sa masaganang pamayanan." },
  "aboutPage.missionTitle": { en: "Our Mission", tl: "Aming Misyon" },
  "aboutPage.mission1": { en: "Promote the development of farmers through modern knowledge, machinery, and farming technology.", tl: "Itaguyod ang kaunlaran ng mga magsasaka sa pamamagitan ng makabagong kaalaman, makinarya, at teknolohiya sa pagsasaka." },
  "aboutPage.mission2": { en: "Promote cooperativism, mutual help, and discipline as the foundation for the success of every member.", tl: "Itaguyod ang kooperatibismo, pagtutulungan, at disiplina bilang sandigan ng tagumpay ng bawat kasapi." },
  "aboutPage.mission3": { en: "Provide continuous education, training, and opportunities to all members to develop their livelihood and the entire community.", tl: "Magbigay ng tuloy-tuloy na edukasyon, pagsasanay, at oportunidad sa lahat ng miyembro upang mapaunlad ang kanilang kabuhayan at ang buong komunidad." },
  "aboutPage.storyBadge": { en: "Our Story", tl: "Aming Kuwento" },
  "aboutPage.journeyTitle": { en: "Our Journey", tl: "Aming Paglalakbay" },
  "aboutPage.journeyDesc": { en: "From humble beginnings to a thriving agricultural community", tl: "Mula sa mababang simula hanggang sa umuunlad na komunidad ng agrikultura" },
  "aboutPage.foundation": { en: "Foundation", tl: "Pagtatatag" },
  "aboutPage.foundationDesc": { en: "Establishment of BCFIA with 43 pioneering members and first election of officers.", tl: "Pagtatatag ng BCFIA kasama ang 43 na pioneer na miyembro at unang halalan ng mga opisyal." },
  "aboutPage.recognition": { en: "Formal Recognition", tl: "Pormal na Pagkilala" },
  "aboutPage.recognitionDesc": { en: "DOLE registration to expand support and collaboration with government agencies.", tl: "Pagpaparehistro sa DOLE para palawakin ang suporta at pakikipagtulungan sa mga ahensya ng gobyerno." },
  "aboutPage.growth": { en: "Organizational Growth", tl: "Paglago ng Organisasyon" },
  "aboutPage.growthDesc": { en: "SEC registration for partnerships and enterprise development initiatives.", tl: "Pagpaparehistro sa SEC para sa mga partnership at inisyatiba sa pagpapaunlad ng negosyo." },
  "aboutPage.impact": { en: "Community Impact", tl: "Epekto sa Komunidad" },
  "aboutPage.impactDesc": { en: "Ongoing efforts to support farmers and promote sustainable agriculture.", tl: "Patuloy na pagsisikap na suportahan ang mga magsasaka at isulong ang sustainable na agrikultura." },
  "aboutPage.valuesTitle": { en: "Our Core Values", tl: "Mga Pangunahing Halaga" },
  "aboutPage.valuesDesc": { en: "The principles that guide everything we do", tl: "Ang mga prinsipyong gumagabay sa lahat ng aming ginagawa" },
  "aboutPage.unity": { en: "Unity", tl: "Pagkakaisa" },
  "aboutPage.unityDesc": { en: "Bringing farmers together for shared progress and success", tl: "Pinagsasama-sama ang mga magsasaka para sa iisang layunin at tagumpay" },
  "aboutPage.empowerment": { en: "Empowerment", tl: "Pagbibigay-Kapangyarihan" },
  "aboutPage.empowermentDesc": { en: "Building capacity and skills for agricultural excellence", tl: "Pagbuo ng kakayahan at kasanayan para sa kahusayan sa agrikultura" },
  "aboutPage.community": { en: "Community", tl: "Komunidad" },
  "aboutPage.communityDesc": { en: "Fostering cooperation for the betterment of all members", tl: "Pagtataguyod ng kooperasyon para sa ikabubuti ng lahat ng miyembro" },
  "aboutPage.sustainability": { en: "Sustainability", tl: "Sustainability" },
  "aboutPage.sustainabilityDesc": { en: "Promoting eco-friendly and lasting farming practices", tl: "Pagsusulong ng eco-friendly at pangmatagalang mga gawi sa pagsasaka" },
  "aboutPage.developedBy": { en: "Developed By", tl: "Binuo Ng" },
  "aboutPage.agriverseDesc": { en: "Agriverse is a passion project created by five dedicated students from Indang, Cavite, who share a common goal: to help local farmers increase their sales and reach a wider market. We believe that technology can bridge the gap between farmers and consumers, empowering our agricultural community to thrive in the digital age.", tl: "Ang Agriverse ay isang passion project na ginawa ng limang dedikadong estudyante mula sa Indang, Cavite, na may iisang layunin: tulungan ang mga lokal na magsasaka na dagdagan ang kanilang benta at maabot ang mas malawak na merkado. Naniniwala kami na ang teknolohiya ay makakatulong na mabawasan ang pagitan ng mga magsasaka at mamimili, at bigyan ng kapangyarihan ang aming komunidad ng agrikultura na umunlad sa digital na panahon." },
  "aboutPage.teamQuote": { en: "\"For the farmers of Indang, by the students of Indang.\"", tl: "\"Para sa mga magsasaka ng Indang, mula sa mga estudyante ng Indang.\"" },
  "aboutPage.leadDeveloper": { en: "Lead Developer", tl: "Punong Developer" },
  "aboutPage.uiuxDesigner": { en: "UI/UX Designer", tl: "UI/UX Designer" },
  "aboutPage.projectManager": { en: "Project Manager", tl: "Project Manager" },
  "aboutPage.tester": { en: "Tester", tl: "Tester" },
  "aboutPage.documenter": { en: "Documenter", tl: "Dokumentarista" },
  
  // Common
  "common.loading": { en: "Loading...", tl: "Naglo-load..." },
  "common.save": { en: "Save", tl: "I-save" },
  "common.cancel": { en: "Cancel", tl: "Kanselahin" },
  "common.delete": { en: "Delete", tl: "Tanggalin" },
  "common.edit": { en: "Edit", tl: "I-edit" },
  "common.create": { en: "Create", tl: "Gumawa" },
  "common.back": { en: "Back", tl: "Bumalik" },
  "common.backToHome": { en: "Back to Home", tl: "Bumalik sa Tahanan" },
  "common.backToMarketplace": { en: "Back to Marketplace", tl: "Bumalik sa Pamilihan" },
  "common.lastUpdated": { en: "Last updated", tl: "Huling na-update" },
  
  // Privacy Policy
  "privacy.title": { en: "Privacy Policy", tl: "Patakaran sa Privacy" },
  "privacy.subtitle": { en: "Your privacy is important to us. This policy explains how AgriVerse collects, uses, and protects your personal information.", tl: "Mahalaga sa amin ang iyong privacy. Ipinapaliwanag ng patakarang ito kung paano kinokolekta, ginagamit, at pinoprotektahan ng AgriVerse ang iyong personal na impormasyon." },
  "privacy.intro": { en: "Banaba Cerca Farmers & Irrigators Agriculture Cooperative (\"AgriVerse,\" \"we,\" \"us,\" or \"our\") is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and share information when you use our agricultural marketplace platform. By using AgriVerse, you agree to the collection and use of information in accordance with this policy.", tl: "Ang Banaba Cerca Farmers & Irrigators Agriculture Cooperative (\"AgriVerse,\" \"kami,\" o \"amin\") ay nakatuon sa pagprotekta ng iyong privacy. Inilalarawan ng Patakarang ito sa Privacy kung paano kami nangongolekta, gumagamit, at nagbabahagi ng impormasyon kapag ginagamit mo ang aming platform ng pamilihan ng agrikultura. Sa paggamit ng AgriVerse, sumasang-ayon ka sa pagkolekta at paggamit ng impormasyon alinsunod sa patakarang ito." },
  "privacy.infoCollect": { en: "Information We Collect", tl: "Impormasyong Kinokolekta Namin" },
  "privacy.infoCollect1": { en: "Personal Information: When you register for an account, we collect your name, email address, phone number, and shipping address.", tl: "Personal na Impormasyon: Kapag nagrehistro ka para sa account, kinokolekta namin ang iyong pangalan, email address, numero ng telepono, at address ng pagpapadala." },
  "privacy.infoCollect2": { en: "Account Data: If you sign in using third-party services like Google or Facebook, we receive basic profile information from those platforms.", tl: "Data ng Account: Kung mag-sign in ka gamit ang mga serbisyo ng third-party tulad ng Google o Facebook, natatanggap namin ang pangunahing impormasyon ng profile mula sa mga platform na iyon." },
  "privacy.infoCollect3": { en: "Transaction Data: We collect details about your purchases, orders, and payment information to process transactions.", tl: "Data ng Transaksyon: Kinokolekta namin ang mga detalye tungkol sa iyong mga pagbili, order, at impormasyon sa pagbabayad para iproseso ang mga transaksyon." },
  "privacy.infoCollect4": { en: "Usage Data: We automatically collect information about how you interact with our platform, including pages visited, features used, and time spent on the site.", tl: "Data ng Paggamit: Awtomatiko naming kinokolekta ang impormasyon tungkol sa kung paano ka nakikipag-ugnayan sa aming platform, kabilang ang mga pahina na binisita, mga tampok na ginamit, at oras na ginugol sa site." },
  "privacy.infoCollect5": { en: "Device Information: We collect data about the device you use to access AgriVerse, including IP address, browser type, and operating system.", tl: "Impormasyon ng Device: Kinokolekta namin ang data tungkol sa device na ginagamit mo para ma-access ang AgriVerse, kabilang ang IP address, uri ng browser, at operating system." },
  "privacy.howWeUse": { en: "How We Use Your Data", tl: "Paano Namin Ginagamit ang Iyong Data" },
  "privacy.howWeUse1": { en: "To create and manage your account and provide customer support.", tl: "Para gumawa at pamahalaan ang iyong account at magbigay ng suporta sa customer." },
  "privacy.howWeUse2": { en: "To process orders, payments, and deliver products to you.", tl: "Para iproseso ang mga order, pagbabayad, at maghatid ng mga produkto sa iyo." },
  "privacy.howWeUse3": { en: "To communicate with you about orders, updates, and promotional offers.", tl: "Para makipag-ugnayan sa iyo tungkol sa mga order, update, at mga promotional offer." },
  "privacy.howWeUse4": { en: "To improve our platform, services, and user experience.", tl: "Para mapabuti ang aming platform, serbisyo, at karanasan ng user." },
  "privacy.howWeUse5": { en: "To detect and prevent fraud, unauthorized access, and other security issues.", tl: "Para matukoy at maiwasan ang panloloko, hindi awtorisadong access, at iba pang mga isyu sa seguridad." },
  "privacy.howWeUse6": { en: "To comply with legal obligations and enforce our terms of service.", tl: "Para sumunod sa mga legal na obligasyon at ipatupad ang aming mga tuntunin ng serbisyo." },
  "privacy.thirdParty": { en: "Third-Party Services", tl: "Mga Serbisyo ng Third-Party" },
  "privacy.thirdParty1": { en: "Authentication Providers: We use Google and Facebook for social login. When you use these services, their respective privacy policies apply to the data they collect.", tl: "Mga Provider ng Authentication: Gumagamit kami ng Google at Facebook para sa social login. Kapag ginamit mo ang mga serbisyong ito, nalalapat ang kani-kanilang mga patakaran sa privacy sa data na kinokolekta nila." },
  "privacy.thirdParty2": { en: "Payment Processors: We use secure payment gateways like GCash to process transactions. Your payment information is handled directly by these providers.", tl: "Mga Payment Processor: Gumagamit kami ng mga secure na payment gateway tulad ng GCash para iproseso ang mga transaksyon. Ang iyong impormasyon sa pagbabayad ay direktang hinahawakan ng mga provider na ito." },
  "privacy.thirdParty3": { en: "Analytics Services: We may use third-party analytics tools to understand how users interact with our platform.", tl: "Mga Serbisyo ng Analytics: Maaari kaming gumamit ng mga tool sa analytics ng third-party para maunawaan kung paano nakikipag-ugnayan ang mga user sa aming platform." },
  "privacy.thirdParty4": { en: "We do not sell your personal information to third parties. We only share data with service providers necessary to operate our platform.", tl: "Hindi namin ibinebenta ang iyong personal na impormasyon sa mga third party. Nagbabahagi lamang kami ng data sa mga service provider na kinakailangan para patakbuhin ang aming platform." },
  "privacy.cookies": { en: "Cookies and Tracking", tl: "Cookies at Tracking" },
  "privacy.cookies1": { en: "Essential Cookies: Required for the platform to function properly, including authentication and security.", tl: "Essential Cookies: Kinakailangan para gumana nang maayos ang platform, kabilang ang authentication at seguridad." },
  "privacy.cookies2": { en: "Preference Cookies: Remember your settings and preferences for a better experience.", tl: "Preference Cookies: Natatandaan ang iyong mga setting at kagustuhan para sa mas mahusay na karanasan." },
  "privacy.cookies3": { en: "Analytics Cookies: Help us understand how visitors use our platform to improve our services.", tl: "Analytics Cookies: Nakakatulong sa amin na maunawaan kung paano ginagamit ng mga bisita ang aming platform para mapabuti ang aming mga serbisyo." },
  "privacy.cookies4": { en: "You can manage cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.", tl: "Maaari mong pamahalaan ang mga kagustuhan sa cookie sa pamamagitan ng mga setting ng iyong browser. Ang pag-disable ng ilang cookies ay maaaring makaapekto sa functionality ng platform." },
  "privacy.dataSecurity": { en: "Data Protection and Security", tl: "Proteksyon at Seguridad ng Data" },
  "privacy.dataSecurity1": { en: "We implement industry-standard security measures to protect your personal information.", tl: "Nagpapatupad kami ng industry-standard na mga hakbang sa seguridad para protektahan ang iyong personal na impormasyon." },
  "privacy.dataSecurity2": { en: "All data transmissions are encrypted using SSL/TLS technology.", tl: "Lahat ng data transmission ay naka-encrypt gamit ang SSL/TLS technology." },
  "privacy.dataSecurity3": { en: "We regularly review and update our security practices to address new threats.", tl: "Regular naming sinusuri at ina-update ang aming mga security practice para matugunan ang mga bagong banta." },
  "privacy.dataSecurity4": { en: "Access to personal data is restricted to authorized personnel only.", tl: "Ang access sa personal na data ay limitado lamang sa mga awtorisadong tauhan." },
  "privacy.dataSecurity5": { en: "While we strive to protect your data, no method of transmission over the internet is 100% secure.", tl: "Habang nagsisikap kaming protektahan ang iyong data, walang paraan ng transmission sa internet na 100% secure." },
  "privacy.yourRights": { en: "Your Rights", tl: "Iyong mga Karapatan" },
  "privacy.yourRights1": { en: "Access: You can request a copy of the personal data we hold about you.", tl: "Access: Maaari kang humiling ng kopya ng personal na data na hawak namin tungkol sa iyo." },
  "privacy.yourRights2": { en: "Correction: You can update or correct your personal information at any time through your account settings.", tl: "Pagwawasto: Maaari mong i-update o itama ang iyong personal na impormasyon anumang oras sa pamamagitan ng mga setting ng iyong account." },
  "privacy.yourRights3": { en: "Deletion: You can request the deletion of your account and associated data, subject to legal retention requirements.", tl: "Pagtanggal: Maaari kang humiling ng pagtanggal ng iyong account at nauugnay na data, ayon sa mga kinakailangan sa legal na pagpapanatili." },
  "privacy.yourRights4": { en: "Opt-Out: You can unsubscribe from marketing communications at any time.", tl: "Opt-Out: Maaari kang mag-unsubscribe mula sa mga marketing communication anumang oras." },
  "privacy.yourRights5": { en: "Data Portability: You can request your data in a portable format where applicable.", tl: "Data Portability: Maaari mong hingin ang iyong data sa isang portable format kung naaangkop." },
  "privacy.updates": { en: "Updates to This Policy", tl: "Mga Update sa Patakarang Ito" },
  "privacy.updatesDesc": { en: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the \"Last updated\" date. We encourage you to review this policy periodically for any changes.", tl: "Maaari naming i-update ang Patakaran sa Privacy na ito paminsan-minsan. Aabisuhan ka namin ng anumang mga pagbabago sa pamamagitan ng pag-post ng bagong patakaran sa pahinang ito at pag-update ng petsa ng \"Huling na-update\". Hinihikayat ka naming suriin ang patakarang ito paminsan-minsan para sa anumang mga pagbabago." },
  "privacy.contact": { en: "Contact Us", tl: "Makipag-ugnayan sa Amin" },
  "privacy.contactDesc": { en: "If you have any questions about this Privacy Policy or our data practices, please contact us:", tl: "Kung mayroon kang anumang mga katanungan tungkol sa Patakaran sa Privacy na ito o sa aming mga gawi sa data, mangyaring makipag-ugnayan sa amin:" },
  
  // Terms of Service
  "terms.title": { en: "Terms of Service", tl: "Mga Tuntunin ng Serbisyo" },
  "terms.subtitle": { en: "Please read these terms carefully before using AgriVerse. By accessing or using our platform, you agree to be bound by these terms.", tl: "Mangyaring basahin nang mabuti ang mga tuntuning ito bago gamitin ang AgriVerse. Sa pag-access o paggamit ng aming platform, sumasang-ayon kang sumailalim sa mga tuntuning ito." },
  "terms.intro": { en: "Welcome to AgriVerse, an agricultural marketplace platform operated by Banaba Cerca Farmers & Irrigators Agriculture Cooperative. These Terms of Service (\"Terms\") govern your access to and use of our website, mobile applications, and services. By creating an account or using AgriVerse, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our platform.", tl: "Maligayang pagdating sa AgriVerse, isang platform ng pamilihan ng agrikultura na pinapatakbo ng Banaba Cerca Farmers & Irrigators Agriculture Cooperative. Ang mga Tuntunin ng Serbisyo na ito (\"Mga Tuntunin\") ay namamahala sa iyong pag-access at paggamit ng aming website, mga mobile application, at mga serbisyo. Sa paggawa ng account o paggamit ng AgriVerse, sumasang-ayon kang sumunod at sumailalim sa mga Tuntuning ito. Kung hindi ka sumasang-ayon sa mga Tuntuning ito, mangyaring huwag gamitin ang aming platform." },
  "terms.accountResponsibilities": { en: "Account Responsibilities", tl: "Mga Responsibilidad ng Account" },
  "terms.account1": { en: "You must be at least 18 years old or have parental consent to use AgriVerse.", tl: "Dapat ay hindi bababa sa 18 taong gulang ka o may pahintulot ng magulang para gamitin ang AgriVerse." },
  "terms.account2": { en: "You are responsible for maintaining the confidentiality of your account credentials.", tl: "Ikaw ang may pananagutan sa pagpapanatili ng pagiging kumpidensyal ng iyong mga kredensyal ng account." },
  "terms.account3": { en: "You agree to provide accurate, current, and complete information during registration.", tl: "Sumasang-ayon kang magbigay ng tumpak, kasalukuyan, at kumpletong impormasyon sa panahon ng pagpaparehistro." },
  "terms.account4": { en: "You are responsible for all activities that occur under your account.", tl: "Ikaw ang may pananagutan sa lahat ng mga aktibidad na nangyayari sa ilalim ng iyong account." },
  "terms.account5": { en: "You must notify us immediately of any unauthorized use of your account.", tl: "Dapat mo kaming abisuhan kaagad ng anumang hindi awtorisadong paggamit ng iyong account." },
  "terms.account6": { en: "We reserve the right to suspend or terminate accounts that violate these terms.", tl: "Inilalaan namin ang karapatang suspindihin o wakasan ang mga account na lumalabag sa mga tuntuning ito." },
  "terms.marketplace": { en: "Marketplace Transactions", tl: "Mga Transaksyon sa Pamilihan" },
  "terms.marketplace1": { en: "AgriVerse acts as a platform connecting buyers and sellers. We are not a party to transactions between users.", tl: "Ang AgriVerse ay gumaganap bilang isang platform na nag-uugnay sa mga mamimili at nagbebenta. Hindi kami bahagi ng mga transaksyon sa pagitan ng mga user." },
  "terms.marketplace2": { en: "Sellers are responsible for the accuracy of product listings, pricing, and fulfillment of orders.", tl: "Ang mga nagbebenta ay may pananagutan sa katumpakan ng mga listahan ng produkto, pagpepresyo, at pagtupad ng mga order." },
  "terms.marketplace3": { en: "Buyers are responsible for reviewing product details before making purchases.", tl: "Ang mga mamimili ay may pananagutan sa pagsusuri ng mga detalye ng produkto bago bumili." },
  "terms.marketplace4": { en: "All prices are displayed in Philippine Pesos (₱) unless otherwise stated.", tl: "Lahat ng presyo ay ipinapakita sa Philippine Pesos (₱) maliban kung iba ang nakasaad." },
  "terms.marketplace5": { en: "Payment processing is handled by secure third-party providers. We do not store your payment card details.", tl: "Ang pagpoproseso ng pagbabayad ay hinahawakan ng mga secure na third-party provider. Hindi namin iniimbak ang mga detalye ng iyong payment card." },
  "terms.marketplace6": { en: "Disputes between buyers and sellers should first be resolved directly. AgriVerse may assist in mediation but is not liable for transaction outcomes.", tl: "Ang mga hindi pagkakaunawaan sa pagitan ng mga mamimili at nagbebenta ay dapat munang resolbahin nang direkta. Maaaring tumulong ang AgriVerse sa pamamagitan pero hindi mananagot sa mga resulta ng transaksyon." },
  "terms.prohibited": { en: "Prohibited Activities", tl: "Mga Ipinagbabawal na Aktibidad" },
  "terms.prohibited1": { en: "Using the platform for any illegal or unauthorized purpose.", tl: "Paggamit ng platform para sa anumang ilegal o hindi awtorisadong layunin." },
  "terms.prohibited2": { en: "Posting false, misleading, or fraudulent product listings.", tl: "Pag-post ng mga maling, nakakapanlinlang, o mapanlinlang na listahan ng produkto." },
  "terms.prohibited3": { en: "Attempting to manipulate prices, reviews, or platform features.", tl: "Pagtatangkang manipulahin ang mga presyo, review, o mga tampok ng platform." },
  "terms.prohibited4": { en: "Harassing, threatening, or abusing other users.", tl: "Panliligalig, pagbabanta, o pang-aabuso sa ibang mga user." },
  "terms.prohibited5": { en: "Uploading viruses, malware, or any malicious code.", tl: "Pag-upload ng mga virus, malware, o anumang malisyosong code." },
  "terms.prohibited6": { en: "Scraping, data mining, or using automated systems to access the platform without permission.", tl: "Scraping, data mining, o paggamit ng mga automated system para ma-access ang platform nang walang pahintulot." },
  "terms.prohibited7": { en: "Impersonating another person or entity.", tl: "Pagpapanggap bilang ibang tao o entity." },
  "terms.prohibited8": { en: "Violating any applicable laws or regulations.", tl: "Paglabag sa anumang naaangkop na mga batas o regulasyon." },
  "terms.ip": { en: "Intellectual Property", tl: "Intellectual Property" },
  "terms.ip1": { en: "All content on AgriVerse, including logos, designs, text, and software, is owned by or licensed to us.", tl: "Lahat ng content sa AgriVerse, kabilang ang mga logo, disenyo, teksto, at software, ay pagmamay-ari o lisensyado sa amin." },
  "terms.ip2": { en: "You may not copy, reproduce, distribute, or create derivative works without our written permission.", tl: "Hindi ka maaaring kumopya, mag-reproduce, mamahagi, o lumikha ng mga derivative work nang walang aming nakasulat na pahintulot." },
  "terms.ip3": { en: "By posting content on AgriVerse, you grant us a non-exclusive, royalty-free license to use, display, and distribute that content.", tl: "Sa pag-post ng content sa AgriVerse, nagbibigay ka sa amin ng non-exclusive, royalty-free na lisensya para gamitin, ipakita, at ipamahagi ang content na iyon." },
  "terms.ip4": { en: "You represent that you own or have the necessary rights to any content you post.", tl: "Kinakatawan mo na pagmamay-ari mo o mayroon kang mga kinakailangang karapatan sa anumang content na ipo-post mo." },
  "terms.ip5": { en: "We respect intellectual property rights and will respond to valid infringement claims.", tl: "Iginagalang namin ang mga karapatan sa intellectual property at tutugon sa mga wastong claim ng paglabag." },
  "terms.service": { en: "Service Availability", tl: "Availability ng Serbisyo" },
  "terms.service1": { en: "AgriVerse is provided on an \"as-is\" and \"as-available\" basis.", tl: "Ang AgriVerse ay ibinibigay sa batayan ng \"as-is\" at \"as-available\"." },
  "terms.service2": { en: "We do not guarantee that the platform will be uninterrupted, error-free, or secure.", tl: "Hindi namin ginagarantiya na ang platform ay hindi maaantala, walang error, o secure." },
  "terms.service3": { en: "We may modify, suspend, or discontinue any part of the service at any time without notice.", tl: "Maaari naming baguhin, suspindihin, o ihinto ang anumang bahagi ng serbisyo anumang oras nang walang abiso." },
  "terms.service4": { en: "We are not responsible for any loss or damage resulting from service interruptions.", tl: "Hindi kami responsable sa anumang pagkawala o pinsala na resulta ng mga pagkaantala ng serbisyo." },
  "terms.service5": { en: "Scheduled maintenance may temporarily affect platform availability.", tl: "Ang naka-iskedyul na maintenance ay maaaring pansamantalang makaapekto sa availability ng platform." },
  "terms.liability": { en: "Limitations of Liability", tl: "Mga Limitasyon ng Pananagutan" },
  "terms.liability1": { en: "To the maximum extent permitted by law, AgriVerse is not liable for any indirect, incidental, special, or consequential damages.", tl: "Sa pinakamataas na lawak na pinapahintulutan ng batas, hindi mananagot ang AgriVerse para sa anumang hindi direkta, incidental, espesyal, o consequential na pinsala." },
  "terms.liability2": { en: "We are not responsible for the quality, safety, or legality of products listed by sellers.", tl: "Hindi kami responsable sa kalidad, kaligtasan, o legalidad ng mga produktong nakalista ng mga nagbebenta." },
  "terms.liability3": { en: "We do not guarantee the accuracy of information provided by users.", tl: "Hindi namin ginagarantiya ang katumpakan ng impormasyong ibinigay ng mga user." },
  "terms.liability4": { en: "Our total liability for any claims arising from your use of the platform is limited to the amount you paid us, if any, in the past 12 months.", tl: "Ang aming kabuuang pananagutan para sa anumang mga claim na nagmumula sa iyong paggamit ng platform ay limitado sa halagang binayaran mo sa amin, kung mayroon man, sa nakalipas na 12 buwan." },
  "terms.liability5": { en: "Some jurisdictions do not allow certain limitations, so some of these may not apply to you.", tl: "Ang ilang hurisdiksyon ay hindi pinapayagan ang ilang mga limitasyon, kaya ang ilan sa mga ito ay maaaring hindi mailapat sa iyo." },
  "terms.termination": { en: "Account Termination", tl: "Pagwawakas ng Account" },
  "terms.termination1": { en: "You may close your account at any time by contacting us or through your account settings.", tl: "Maaari mong isara ang iyong account anumang oras sa pamamagitan ng pakikipag-ugnayan sa amin o sa pamamagitan ng mga setting ng iyong account." },
  "terms.termination2": { en: "We may suspend or terminate your account for violations of these terms.", tl: "Maaari naming suspindihin o wakasan ang iyong account dahil sa mga paglabag sa mga tuntuning ito." },
  "terms.termination3": { en: "Upon termination, your right to use the platform ceases immediately.", tl: "Sa pagwawakas, ang iyong karapatang gamitin ang platform ay agad na titigil." },
  "terms.termination4": { en: "We may retain certain information as required by law or for legitimate business purposes.", tl: "Maaari naming panatilihin ang ilang impormasyon ayon sa kinakailangan ng batas o para sa lehitimong mga layuning pangnegosyo." },
  "terms.termination5": { en: "Termination does not affect any rights or obligations that arose before the termination date.", tl: "Ang pagwawakas ay hindi nakakaapekto sa anumang mga karapatan o obligasyon na lumitaw bago ang petsa ng pagwawakas." },
  "terms.changes": { en: "Changes to Terms", tl: "Mga Pagbabago sa mga Tuntunin" },
  "terms.changes1": { en: "We reserve the right to modify these Terms of Service at any time.", tl: "Inilalaan namin ang karapatang baguhin ang mga Tuntunin ng Serbisyo na ito anumang oras." },
  "terms.changes2": { en: "Changes will be effective immediately upon posting to the platform.", tl: "Ang mga pagbabago ay magkakabisa kaagad pagkatapos i-post sa platform." },
  "terms.changes3": { en: "We will notify users of significant changes through email or platform notifications.", tl: "Aabisuhan namin ang mga user ng mga makabuluhang pagbabago sa pamamagitan ng email o mga notification ng platform." },
  "terms.changes4": { en: "Your continued use of AgriVerse after changes constitutes acceptance of the new terms.", tl: "Ang iyong patuloy na paggamit ng AgriVerse pagkatapos ng mga pagbabago ay bumubuo ng pagtanggap sa mga bagong tuntunin." },
  "terms.changes5": { en: "If you do not agree with the updated terms, you should stop using the platform.", tl: "Kung hindi ka sumasang-ayon sa mga na-update na tuntunin, dapat kang huminto sa paggamit ng platform." },
  "terms.governingLaw": { en: "Governing Law", tl: "Namamahalang Batas" },
  "terms.governingLawDesc": { en: "These Terms are governed by and construed in accordance with the laws of the Republic of the Philippines. Any disputes arising from these Terms or your use of AgriVerse shall be subject to the exclusive jurisdiction of the courts located in Cavite, Philippines.", tl: "Ang mga Tuntuning ito ay pinamamahalaan at binibigyang-kahulugan alinsunod sa mga batas ng Republika ng Pilipinas. Ang anumang mga hindi pagkakaunawaan na nagmumula sa mga Tuntuning ito o sa iyong paggamit ng AgriVerse ay sasailalim sa eksklusibong hurisdiksyon ng mga korte na matatagpuan sa Cavite, Pilipinas." },
  "terms.questions": { en: "Questions?", tl: "May mga Tanong?" },
  "terms.questionsDesc": { en: "If you have any questions about these Terms of Service, please contact us:", tl: "Kung mayroon kang anumang mga katanungan tungkol sa mga Tuntunin ng Serbisyo na ito, mangyaring makipag-ugnayan sa amin:" },
  
  // Contact Admin
  "contact.title": { en: "Contact Admin", tl: "Makipag-ugnayan sa Admin" },
  "contact.subtitle": { en: "Send us a message and we'll get back to you soon", tl: "Magpadala sa amin ng mensahe at babalikan ka namin sa lalong madaling panahon" },
  "contact.sendMessage": { en: "Send Message", tl: "Magpadala ng Mensahe" },
  "contact.formDesc": { en: "Fill out the form to contact AgriVerse administrators", tl: "Punan ang form para makipag-ugnayan sa mga administrator ng AgriVerse" },
  "contact.yourName": { en: "Your Name", tl: "Iyong Pangalan" },
  "contact.namePlaceholder": { en: "Enter your full name", tl: "Ilagay ang iyong buong pangalan" },
  "contact.yourEmail": { en: "Your Email", tl: "Iyong Email" },
  "contact.emailPlaceholder": { en: "your.email@example.com", tl: "iyong.email@halimbawa.com" },
  "contact.subject": { en: "Subject", tl: "Paksa" },
  "contact.subjectPlaceholder": { en: "What is this about?", tl: "Tungkol saan ito?" },
  "contact.message": { en: "Message", tl: "Mensahe" },
  "contact.messagePlaceholder": { en: "Tell us more about your request...", tl: "Sabihin pa sa amin ang tungkol sa iyong kahilingan..." },
  "contact.note": { en: "Clicking \"Send Message\" will open Gmail in a new tab with your pre-filled message ready to send.", tl: "Ang pag-click sa \"Magpadala ng Mensahe\" ay magbubukas ng Gmail sa bagong tab na may iyong pre-filled na mensaheng handa nang ipadala." },
  "contact.directContact": { en: "Direct Contact:", tl: "Direktang Kontak:" },
  "contact.openingGmail": { en: "Opening Gmail", tl: "Binubuksan ang Gmail" },
  "contact.gmailDesc": { en: "Gmail will open in a new tab with your message.", tl: "Magbubukas ang Gmail sa bagong tab kasama ang iyong mensahe." },
  "contact.missingFields": { en: "Missing Fields", tl: "Kulang ang mga Field" },
  "contact.fillRequired": { en: "Please fill in all required fields.", tl: "Mangyaring punan ang lahat ng kinakailangang mga field." },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
