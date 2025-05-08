"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define supported languages
export type Language = "en" | "id" | "zh" | "ja"

// Define language context type
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Translations dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.categories": "Categories",
    "nav.trending": "Trending",
    "nav.about": "About",
    "nav.admin": "Admin",
    "nav.search": "Search tools...",

    // Homepage
    "home.title": "Discover the Perfect Tools for Your Profession",
    "home.subtitle":
      "Explore our curated collection of professional tools and resources to boost your productivity and creativity.",
    "home.search": "Search for tools...",
    "home.search.button": "Search",
    "home.trending": "Trending Now",
    "home.popular": "Most Popular Tools",
    "home.popular.subtitle": "Discover what professionals like you are using right now",
    "home.explore": "Explore by Profession",
    "home.explore.subtitle": "Find tools tailored to your specific professional needs",
    "home.explore.button": "Explore",
    "home.more": "View All Categories",
    "home.why": "Why Choose Us",
    "home.curated": "Curated Tool Recommendations",
    "home.curated.description":
      "Our platform analyzes the most popular tools used by professionals in your field. Save time searching and focus on what matters most.",
    "home.feature1": "Curated recommendations based on your profession",
    "home.feature2": "Detailed reviews and ratings from professionals",
    "home.feature3": "Trending tools based on real usage data",
    "home.feature4": "Tutorials and guides to help you get started",
    "home.perfect": "Find Your Perfect Tools",
    "home.perfect.subtitle": "All the tools you need in one place",

    // Tool Card
    "tool.visit": "Visit Site",
    "tool.details": "Details",
    "tool.free": "Free",

    // Categories
    "categories.title": "Browse All Categories",
    "categories.subtitle": "Explore our comprehensive collection of tools organized by profession",

    // Trending
    "trending.title": "Trending Tools",
    "trending.subtitle": "Discover the most popular tools based on real usage data from professionals like you",
    "trending.top": "Top 10 Overall",
    "trending.content": "Trending in Content Creation",
    "trending.development": "Trending in Development",
    "trending.design": "Trending in Design",

    // Tool Details
    "tool.back": "Back to",
    "tool.price": "Price",
    "tool.tags": "Tags",
    "tool.added": "Added",
    "tool.website": "Visit Official Website",
    "tool.features": "Features",
    "tool.reviews": "Reviews",
    "tool.alternatives": "Alternatives",
    "tool.key": "Key Features",
    "tool.user": "User Reviews",
    "tool.alt": "Alternative Tools",
    "tool.more": "More Tools You Might Like",
    "tool.view": "View Details",

    // Admin
    "admin.dashboard": "Dashboard",
    "admin.tools": "Tools",
    "admin.categories": "Categories",
    "admin.users": "Users",
    "admin.analytics": "Analytics",
    "admin.settings": "Settings",
    "admin.overview": "Overview of your tools directory",
    "admin.total.tools": "Total Tools",
    "admin.total.users": "Total Users",
    "admin.clicks": "Affiliate Clicks",
    "admin.revenue": "Revenue",
    "admin.from": "from last month",
    "admin.recent": "Recent Tools",
    "admin.recent.desc": "Recently added tools to the directory",
    "admin.popular": "Popular Categories",
    "admin.popular.desc": "Most popular categories by user visits",
    "admin.add": "Add New Tool",
    "admin.manage": "Manage tools in your directory",
    "admin.search": "Search tools...",
    "admin.name": "Name",
    "admin.category": "Category",
    "admin.price": "Price",
    "admin.rating": "Rating",
    "admin.date": "Date Added",
    "admin.actions": "Actions",
    "admin.edit": "Edit",
    "admin.delete": "Delete",
    "admin.new": "Add New Tool",
    "admin.new.desc": "Add a new tool to your directory",
    "admin.tool.name": "Tool Name",
    "admin.tool.desc": "Description",
    "admin.tool.url": "Tool URL",
    "admin.tool.image": "Image URL",
    "admin.tool.tags": "Tags",
    "admin.cancel": "Cancel",
    "admin.save": "Save Tool",
    "admin.adding": "Adding...",
  },
  id: {
    // Navigation
    "nav.home": "Beranda",
    "nav.categories": "Kategori",
    "nav.trending": "Tren",
    "nav.about": "Tentang",
    "nav.admin": "Admin",
    "nav.search": "Cari alat...",

    // Homepage
    "home.title": "Temukan Alat Sempurna untuk Profesi Anda",
    "home.subtitle":
      "Jelajahi koleksi alat dan sumber daya profesional kami untuk meningkatkan produktivitas dan kreativitas Anda.",
    "home.search": "Cari alat...",
    "home.search.button": "Cari",
    "home.trending": "Sedang Tren",
    "home.popular": "Alat Paling Populer",
    "home.popular.subtitle": "Temukan apa yang digunakan oleh profesional seperti Anda saat ini",
    "home.explore": "Jelajahi berdasarkan Profesi",
    "home.explore.subtitle": "Temukan alat yang disesuaikan dengan kebutuhan profesional spesifik Anda",
    "home.explore.button": "Jelajahi",
    "home.more": "Lihat Semua Kategori",
    "home.why": "Mengapa Memilih Kami",
    "home.curated": "Rekomendasi Alat Terkurasi",
    "home.curated.description":
      "Platform kami menganalisis alat paling populer yang digunakan oleh profesional di bidang Anda. Hemat waktu pencarian dan fokus pada hal yang paling penting.",
    "home.feature1": "Rekomendasi terkurasi berdasarkan profesi Anda",
    "home.feature2": "Ulasan dan peringkat terperinci dari para profesional",
    "home.feature3": "Alat tren berdasarkan data penggunaan nyata",
    "home.feature4": "Tutorial dan panduan untuk membantu Anda memulai",
    "home.perfect": "Temukan Alat Sempurna Anda",
    "home.perfect.subtitle": "Semua alat yang Anda butuhkan dalam satu tempat",

    // Tool Card
    "tool.visit": "Kunjungi Situs",
    "tool.details": "Detail",
    "tool.free": "Gratis",

    // Categories
    "categories.title": "Jelajahi Semua Kategori",
    "categories.subtitle": "Jelajahi koleksi komprehensif alat kami yang diatur berdasarkan profesi",

    // Trending
    "trending.title": "Alat Tren",
    "trending.subtitle": "Temukan alat paling populer berdasarkan data penggunaan nyata dari profesional seperti Anda",
    "trending.top": "10 Teratas Keseluruhan",
    "trending.content": "Tren dalam Pembuatan Konten",
    "trending.development": "Tren dalam Pengembangan",
    "trending.design": "Tren dalam Desain",

    // Tool Details
    "tool.back": "Kembali ke",
    "tool.price": "Harga",
    "tool.tags": "Tag",
    "tool.added": "Ditambahkan",
    "tool.website": "Kunjungi Situs Web Resmi",
    "tool.features": "Fitur",
    "tool.reviews": "Ulasan",
    "tool.alternatives": "Alternatif",
    "tool.key": "Fitur Utama",
    "tool.user": "Ulasan Pengguna",
    "tool.alt": "Alat Alternatif",
    "tool.more": "Alat Lain yang Mungkin Anda Suka",
    "tool.view": "Lihat Detail",

    // Admin
    "admin.dashboard": "Dasbor",
    "admin.tools": "Alat",
    "admin.categories": "Kategori",
    "admin.users": "Pengguna",
    "admin.analytics": "Analitik",
    "admin.settings": "Pengaturan",
    "admin.overview": "Ikhtisar direktori alat Anda",
    "admin.total.tools": "Total Alat",
    "admin.total.users": "Total Pengguna",
    "admin.clicks": "Klik Afiliasi",
    "admin.revenue": "Pendapatan",
    "admin.from": "dari bulan lalu",
    "admin.recent": "Alat Terbaru",
    "admin.recent.desc": "Alat yang baru ditambahkan ke direktori",
    "admin.popular": "Kategori Populer",
    "admin.popular.desc": "Kategori paling populer berdasarkan kunjungan pengguna",
    "admin.add": "Tambah Alat Baru",
    "admin.manage": "Kelola alat di direktori Anda",
    "admin.search": "Cari alat...",
    "admin.name": "Nama",
    "admin.category": "Kategori",
    "admin.price": "Harga",
    "admin.rating": "Peringkat",
    "admin.date": "Tanggal Ditambahkan",
    "admin.actions": "Tindakan",
    "admin.edit": "Edit",
    "admin.delete": "Hapus",
    "admin.new": "Tambah Alat Baru",
    "admin.new.desc": "Tambahkan alat baru ke direktori Anda",
    "admin.tool.name": "Nama Alat",
    "admin.tool.desc": "Deskripsi",
    "admin.tool.url": "URL Alat",
    "admin.tool.image": "URL Gambar",
    "admin.tool.tags": "Tag",
    "admin.cancel": "Batal",
    "admin.save": "Simpan Alat",
    "admin.adding": "Menambahkan...",
  },
  zh: {
    // Navigation
    "nav.home": "首页",
    "nav.categories": "分类",
    "nav.trending": "趋势",
    "nav.about": "关于",
    "nav.admin": "管理",
    "nav.search": "搜索工具...",

    // Homepage
    "home.title": "发现适合您职业的完美工具",
    "home.subtitle": "探索我们精心策划的专业工具和资源集合，提高您的生产力和创造力。",
    "home.search": "搜索工具...",
    "home.search.button": "搜索",
    "home.trending": "当前趋势",
    "home.popular": "最受欢迎的工具",
    "home.popular.subtitle": "发现像您这样的专业人士正在使用的工具",
    "home.explore": "按职业探索",
    "home.explore.subtitle": "找到适合您特定专业需求的工具",
    "home.explore.button": "探索",
    "home.more": "查看所有类别",
    "home.why": "为什么选择我们",
    "home.curated": "精选工具推荐",
    "home.curated.description":
      "我们的平台分析您所在领域的专业人士使用的最流行工具。节省搜索时间，专注于最重要的事情。",
    "home.feature1": "基于您职业的精选推荐",
    "home.feature2": "来自专业人士的详细评论和评级",
    "home.feature3": "基于真实使用数据的趋势工具",
    "home.feature4": "帮助您入门的教程和指南",
    "home.perfect": "找到您的完美工具",
    "home.perfect.subtitle": "您需要的所有工具都在一个地方",

    // Tool Card
    "tool.visit": "访问网站",
    "tool.details": "详情",
    "tool.free": "免费",

    // Categories
    "categories.title": "浏览所有类别",
    "categories.subtitle": "探索我们按职业组织的综合工具集合",

    // Trending
    "trending.title": "趋势工具",
    "trending.subtitle": "根据像您这样的专业人士的真实使用数据，发现最受欢迎的工具",
    "trending.top": "总体前10名",
    "trending.content": "内容创作趋势",
    "trending.development": "开发趋势",
    "trending.design": "设计趋势",

    // Tool Details
    "tool.back": "返回到",
    "tool.price": "价格",
    "tool.tags": "标签",
    "tool.added": "添加日期",
    "tool.website": "访问官方网站",
    "tool.features": "功能",
    "tool.reviews": "评论",
    "tool.alternatives": "替代品",
    "tool.key": "主要功能",
    "tool.user": "用户评论",
    "tool.alt": "替代工具",
    "tool.more": "您可能喜欢的更多工具",
    "tool.view": "查看详情",

    // Admin
    "admin.dashboard": "仪表板",
    "admin.tools": "工具",
    "admin.categories": "类别",
    "admin.users": "用户",
    "admin.analytics": "分析",
    "admin.settings": "设置",
    "admin.overview": "工具目录概览",
    "admin.total.tools": "工具总数",
    "admin.total.users": "用户总数",
    "admin.clicks": "联盟点击",
    "admin.revenue": "收入",
    "admin.from": "相比上月",
    "admin.recent": "最新工具",
    "admin.recent.desc": "最近添加到目录的工具",
    "admin.popular": "热门类别",
    "admin.popular.desc": "按用户访问量排名的最受欢迎类别",
    "admin.add": "添加新工具",
    "admin.manage": "管理您目录中的工具",
    "admin.search": "搜索工具...",
    "admin.name": "名称",
    "admin.category": "类别",
    "admin.price": "价格",
    "admin.rating": "评分",
    "admin.date": "添加日期",
    "admin.actions": "操作",
    "admin.edit": "编辑",
    "admin.delete": "删除",
    "admin.new": "添加新工具",
    "admin.new.desc": "向您的目录添加新工具",
    "admin.tool.name": "工具名称",
    "admin.tool.desc": "描述",
    "admin.tool.url": "工具URL",
    "admin.tool.image": "图片URL",
    "admin.tool.tags": "标签",
    "admin.cancel": "取消",
    "admin.save": "保存工具",
    "admin.adding": "添加中...",
  },
  ja: {
    // Navigation
    "nav.home": "ホーム",
    "nav.categories": "カテゴリ",
    "nav.trending": "トレンド",
    "nav.about": "概要",
    "nav.admin": "管理者",
    "nav.search": "ツールを検索...",

    // Homepage
    "home.title": "あなたの職業に最適なツールを発見",
    "home.subtitle": "生産性と創造性を高めるための厳選されたプロフェッショナルツールとリソースを探索しましょう。",
    "home.search": "ツールを検索...",
    "home.search.button": "検索",
    "home.trending": "現在のトレンド",
    "home.popular": "最も人気のあるツール",
    "home.popular.subtitle": "あなたのようなプロフェッショナルが現在使用しているものを発見",
    "home.explore": "職業別に探索",
    "home.explore.subtitle": "あなたの特定の専門的ニーズに合わせたツールを見つける",
    "home.explore.button": "探索",
    "home.more": "すべてのカテゴリを表示",
    "home.why": "私たちを選ぶ理由",
    "home.curated": "厳選されたツール推奨",
    "home.curated.description":
      "私たちのプラットフォームは、あなたの分野のプロフェッショナルが使用する最も人気のあるツールを分析します。検索時間を節約し、最も重要なことに集中しましょう。",
    "home.feature1": "あなたの職業に基づいた厳選された推奨",
    "home.feature2": "プロフェッショナルからの詳細なレビューと評価",
    "home.feature3": "実際の使用データに基づくトレンドツール",
    "home.feature4": "始めるのに役立つチュートリアルとガイド",
    "home.perfect": "あなたの完璧なツールを見つける",
    "home.perfect.subtitle": "必要なすべてのツールが一か所に",

    // Tool Card
    "tool.visit": "サイトを訪問",
    "tool.details": "詳細",
    "tool.free": "無料",

    // Categories
    "categories.title": "すべてのカテゴリを閲覧",
    "categories.subtitle": "職業別に整理された包括的なツールコレクションを探索",

    // Trending
    "trending.title": "トレンドツール",
    "trending.subtitle": "あなたのようなプロフェッショナルからの実際の使用データに基づいて、最も人気のあるツールを発見",
    "trending.top": "全体トップ10",
    "trending.content": "コンテンツ作成のトレンド",
    "trending.development": "開発のトレンド",
    "trending.design": "デザインのトレンド",

    // Tool Details
    "tool.back": "戻る：",
    "tool.price": "価格",
    "tool.tags": "タグ",
    "tool.added": "追加日",
    "tool.website": "公式ウェブサイトを訪問",
    "tool.features": "機能",
    "tool.reviews": "レビュー",
    "tool.alternatives": "代替品",
    "tool.key": "主な機能",
    "tool.user": "ユーザーレビュー",
    "tool.alt": "代替ツール",
    "tool.more": "あなたが気に入るかもしれない他のツール",
    "tool.view": "詳細を表示",

    // Admin
    "admin.dashboard": "ダッシュボード",
    "admin.tools": "ツール",
    "admin.categories": "カテゴリ",
    "admin.users": "ユーザー",
    "admin.analytics": "分析",
    "admin.settings": "設定",
    "admin.overview": "ツールディレクトリの概要",
    "admin.total.tools": "ツール総数",
    "admin.total.users": "ユーザー総数",
    "admin.clicks": "アフィリエイトクリック",
    "admin.revenue": "収益",
    "admin.from": "先月比",
    "admin.recent": "最近のツール",
    "admin.recent.desc": "最近ディレクトリに追加されたツール",
    "admin.popular": "人気カテゴリ",
    "admin.popular.desc": "ユーザー訪問数による最も人気のあるカテゴリ",
    "admin.add": "新しいツールを追加",
    "admin.manage": "ディレクトリ内のツールを管理",
    "admin.search": "ツールを検索...",
    "admin.name": "名前",
    "admin.category": "カテゴリ",
    "admin.price": "価格",
    "admin.rating": "評価",
    "admin.date": "追加日",
    "admin.actions": "アクション",
    "admin.edit": "編集",
    "admin.delete": "削除",
    "admin.new": "新しいツールを追加",
    "admin.new.desc": "ディレクトリに新しいツールを追加",
    "admin.tool.name": "ツール名",
    "admin.tool.desc": "説明",
    "admin.tool.url": "ツールURL",
    "admin.tool.image": "画像URL",
    "admin.tool.tags": "タグ",
    "admin.cancel": "キャンセル",
    "admin.save": "ツールを保存",
    "admin.adding": "追加中...",
  },
}

// Language provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Get initial language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>("en")

  // Load saved language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "id", "zh", "ja"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  // Update localStorage when language changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
