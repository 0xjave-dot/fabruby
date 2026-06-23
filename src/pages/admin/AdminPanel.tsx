import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import {
  Archive,
  BadgePercent,
  CalendarDays,
  ChevronRight,
  CirclePlus,
  Database,
  LayoutDashboard,
  Package,
  Palette,
  Plus,
  RefreshCcw,
  Save,
  Shapes,
  ShieldCheck,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "../../lib/auth";
import {
  archiveCatalogCategory,
  archiveCatalogProduct,
  archiveCatalogVoucher,
  deleteReview,
  normalizeListInput,
  saveCatalogCategory,
  saveCatalogProduct,
  saveCatalogVoucher,
  saveColorSchedule,
  type CatalogCategory,
  type CatalogColorEntry,
  type CatalogProduct,
  type CatalogVoucher,
  useCategories,
  useColorSchedule,
  useProducts,
  useReviews,
  useVouchers,
} from "../../lib/storefrontData";

type AdminTab = "overview" | "products" | "categories" | "vouchers" | "colors" | "reviews";

type ProductFormState = {
  id: string;
  name: string;
  description: string;
  price: string;
  compareAtPrice: string;
  category: string;
  images: string;
  colors: string;
  sizes: string;
  rating: string;
  reviewCount: string;
  tags: string;
  subType: string;
  colorTag: string;
  status: string;
  stockThreshold: string;
};

type CategoryFormState = {
  slug: string;
  name: string;
  itemCount: string;
  emoji: string;
  image: string;
  active: boolean;
};

type VoucherFormState = {
  code: string;
  discountType: "percent" | "fixed" | "freeshipping";
  value: string;
  description: string;
  expiryDays: string;
  emoji: string;
  active: boolean;
  usageLimit: string;
  usedCount: string;
  expiresAt: string;
};

type ColorFormState = {
  color: string;
  hex: string;
  productIds: string;
  active: boolean;
};

const tabs: Array<{ id: AdminTab; label: string; icon: typeof LayoutDashboard }> = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "categories", label: "Categories", icon: Shapes },
  { id: "vouchers", label: "Vouchers", icon: BadgePercent },
  { id: "colors", label: "Color Drops", icon: Palette },
  { id: "reviews", label: "Reviews", icon: Users },
];

function toNumber(value: string, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toOptionalNumber(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function splitMultiLine(value: string) {
  return value
    .split(/[\n,]+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function productToForm(product?: CatalogProduct): ProductFormState {
  return {
    id: product?.id ?? "",
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product ? String(product.price) : "",
    compareAtPrice: product?.compareAtPrice ? String(product.compareAtPrice) : "",
    category: product?.category ?? "",
    images: product?.images?.join("\n") ?? "",
    colors: product?.colors?.join(", ") ?? "",
    sizes: product?.sizes?.join(", ") ?? "",
    rating: product?.rating ? String(product.rating) : "4.8",
    reviewCount: product?.reviewCount ? String(product.reviewCount) : "0",
    tags: product?.tags?.join(", ") ?? "",
    subType: product?.subType ?? "",
    colorTag: product?.colorTag ?? "",
    status: product?.status ?? "active",
    stockThreshold: product?.stockThreshold ? String(product.stockThreshold) : "",
  };
}

function categoryToForm(category?: CatalogCategory): CategoryFormState {
  return {
    slug: category?.slug ?? "",
    name: category?.name ?? "",
    itemCount: category ? String(category.itemCount) : "0",
    emoji: category?.emoji ?? "🛍️",
    image: category?.image ?? "",
    active: category?.active !== false,
  };
}

function voucherToForm(voucher?: CatalogVoucher): VoucherFormState {
  return {
    code: voucher?.code ?? "",
    discountType: voucher?.discountType ?? "percent",
    value: voucher ? String(voucher.value) : "0",
    description: voucher?.description ?? "",
    expiryDays: voucher ? String(voucher.expiryDays) : "7",
    emoji: voucher?.emoji ?? "🎁",
    active: voucher?.active !== false,
    usageLimit: voucher?.usageLimit ? String(voucher.usageLimit) : "",
    usedCount: voucher?.usedCount ? String(voucher.usedCount) : "0",
    expiresAt: voucher?.expiresAt ?? "",
  };
}

function colorEntryToForm(entry?: CatalogColorEntry): ColorFormState {
  return {
    color: entry?.color ?? "",
    hex: entry?.hex ?? "#202020",
    productIds: entry?.productIds?.join(", ") ?? "",
    active: entry?.active !== false,
  };
}

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/45">Catalog console</p>
        <h2 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-white">{title}</h2>
        {subtitle ? <p className="mt-2 max-w-2xl text-sm leading-6 text-white/72">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tone = "white",
}: {
  label: string;
  value: string;
  icon: typeof Database;
  tone?: "white" | "accent";
}) {
  return (
    <div
      className={`rounded-[24px] border p-4 shadow-[0_20px_50px_rgba(0,0,0,0.16)] ${
        tone === "accent" ? "border-white/10 bg-white/[0.08]" : "border-white/10 bg-white/[0.05]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">{label}</p>
          <div className="mt-2 font-display text-3xl font-black tracking-tight text-white">{value}</div>
        </div>
        <span className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white">
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.24em] text-white/50">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-[#ff5790]/40 focus:bg-white/[0.08]"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.24em] text-white/50">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/28 focus:border-[#ff5790]/40 focus:bg-white/[0.08]"
      />
    </label>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
  description,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  description?: string;
}) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-[#ff5790] focus:ring-[#ff5790]"
      />
      <span>
        <span className="block text-sm font-bold text-white">{label}</span>
        {description ? <span className="mt-1 block text-xs leading-5 text-white/55">{description}</span> : null}
      </span>
    </label>
  );
}

function AdminButton({
  children,
  onClick,
  tone = "primary",
  icon: Icon,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  tone?: "primary" | "ghost" | "danger";
  icon?: typeof Save;
  disabled?: boolean;
}) {
  const base = "inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-[11px] font-black uppercase tracking-[0.18em] transition";
  const tones = {
    primary: "bg-white text-[#111] hover:bg-[#f3f3f3]",
    ghost: "border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08]",
    danger: "bg-[#ff5d6d] text-white hover:bg-[#ff4e61]",
  };
  return (
    <button disabled={disabled} onClick={onClick} className={`${base} ${tones[tone]} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}>
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}

export default function AdminPanel() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const { products, loading: productsLoading } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  const { vouchers, loading: vouchersLoading } = useVouchers();
  const { reviews, loading: reviewsLoading } = useReviews();
  const { schedule, loading: scheduleLoading } = useColorSchedule();

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<ProductFormState>(productToForm());
  const [savingProduct, setSavingProduct] = useState(false);

  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState<CategoryFormState>(categoryToForm());
  const [savingCategory, setSavingCategory] = useState(false);

  const [selectedVoucherCode, setSelectedVoucherCode] = useState<string | null>(null);
  const [voucherForm, setVoucherForm] = useState<VoucherFormState>(voucherToForm());
  const [savingVoucher, setSavingVoucher] = useState(false);

  const [colorDrafts, setColorDrafts] = useState<ColorFormState[]>([]);
  const [scheduleDirty, setScheduleDirty] = useState(false);
  const [savingSchedule, setSavingSchedule] = useState(false);

  useEffect(() => {
    if (!selectedProductId) {
      setProductForm(productToForm());
      return;
    }

    const selected = products.find((item) => item.id === selectedProductId);
    if (selected) {
      setProductForm(productToForm(selected));
    }
  }, [products, selectedProductId]);

  useEffect(() => {
    if (!selectedCategorySlug) {
      setCategoryForm(categoryToForm());
      return;
    }

    const selected = categories.find((item) => item.slug === selectedCategorySlug);
    if (selected) {
      setCategoryForm(categoryToForm(selected));
    }
  }, [categories, selectedCategorySlug]);

  useEffect(() => {
    if (!selectedVoucherCode) {
      setVoucherForm(voucherToForm());
      return;
    }

    const selected = vouchers.find((item) => item.code === selectedVoucherCode);
    if (selected) {
      setVoucherForm(voucherToForm(selected));
    }
  }, [selectedVoucherCode, vouchers]);

  useEffect(() => {
    if (scheduleLoading) return;
    if (scheduleDirty) return;
    setColorDrafts(schedule.map((entry) => colorEntryToForm(entry)));
  }, [schedule, scheduleDirty, scheduleLoading]);

  const stats = useMemo(
    () => [
      { label: "Products", value: String(products.length), icon: Package },
      { label: "Categories", value: String(categories.length), icon: Shapes },
      { label: "Vouchers", value: String(vouchers.length), icon: BadgePercent },
      { label: "Reviews", value: String(reviews.length), icon: Users },
      { label: "Color slots", value: String(schedule.length), icon: CalendarDays },
    ],
    [categories.length, products.length, reviews.length, schedule.length, vouchers.length],
  );

  const selectedProduct = products.find((item) => item.id === selectedProductId) ?? null;
  const selectedCategory = categories.find((item) => item.slug === selectedCategorySlug) ?? null;
  const selectedVoucher = vouchers.find((item) => item.code === selectedVoucherCode) ?? null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090909] text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const setProductField = <K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) => {
    setProductForm((current) => ({ ...current, [key]: value }));
  };

  const setCategoryField = <K extends keyof CategoryFormState>(key: K, value: CategoryFormState[K]) => {
    setCategoryForm((current) => ({ ...current, [key]: value }));
  };

  const setVoucherField = <K extends keyof VoucherFormState>(key: K, value: VoucherFormState[K]) => {
    setVoucherForm((current) => ({ ...current, [key]: value }));
  };

  const resetProduct = () => {
    setSelectedProductId(null);
    setProductForm(productToForm());
  };

  const resetCategory = () => {
    setSelectedCategorySlug(null);
    setCategoryForm(categoryToForm());
  };

  const resetVoucher = () => {
    setSelectedVoucherCode(null);
    setVoucherForm(voucherToForm());
  };

  const handleSaveProduct = async () => {
    setSavingProduct(true);
    try {
      const product: CatalogProduct = {
        id: productForm.id.trim(),
        name: productForm.name.trim(),
        description: productForm.description.trim(),
        price: toNumber(productForm.price),
        compareAtPrice: toOptionalNumber(productForm.compareAtPrice),
        category: productForm.category.trim(),
        images: splitMultiLine(productForm.images),
        colors: normalizeListInput(productForm.colors),
        sizes: normalizeListInput(productForm.sizes),
        rating: toNumber(productForm.rating, 0),
        reviewCount: toNumber(productForm.reviewCount, 0),
        tags: normalizeListInput(productForm.tags),
        subType: productForm.subType.trim() || undefined,
        colorTag: productForm.colorTag.trim() || undefined,
        status: (productForm.status.trim() as CatalogProduct["status"]) || "active",
        stockThreshold: toOptionalNumber(productForm.stockThreshold),
      };
      await saveCatalogProduct(product);
      setSelectedProductId(product.id);
    } finally {
      setSavingProduct(false);
    }
  };

  const handleSaveCategory = async () => {
    setSavingCategory(true);
    try {
      const category: CatalogCategory = {
        id: categoryForm.slug.trim(),
        slug: categoryForm.slug.trim(),
        name: categoryForm.name.trim(),
        itemCount: toNumber(categoryForm.itemCount, 0),
        emoji: categoryForm.emoji.trim(),
        image: categoryForm.image.trim(),
        active: categoryForm.active,
      };
      await saveCatalogCategory(category);
      setSelectedCategorySlug(category.slug);
    } finally {
      setSavingCategory(false);
    }
  };

  const handleSaveVoucher = async () => {
    setSavingVoucher(true);
    try {
      const voucher: CatalogVoucher = {
        code: voucherForm.code.trim(),
        discountType: voucherForm.discountType,
        value: toNumber(voucherForm.value, 0),
        description: voucherForm.description.trim(),
        expiryDays: toNumber(voucherForm.expiryDays, 0),
        emoji: voucherForm.emoji.trim(),
        active: voucherForm.active,
        usageLimit: toOptionalNumber(voucherForm.usageLimit),
        usedCount: toNumber(voucherForm.usedCount, 0),
        expiresAt: voucherForm.expiresAt.trim() || undefined,
      };
      await saveCatalogVoucher(voucher);
      setSelectedVoucherCode(voucher.code);
    } finally {
      setSavingVoucher(false);
    }
  };

  const handleSaveSchedule = async () => {
    setSavingSchedule(true);
    try {
      await saveColorSchedule(
        colorDrafts.map((entry) => ({
          color: entry.color.trim(),
          hex: entry.hex.trim(),
          productIds: splitMultiLine(entry.productIds),
          active: entry.active,
        })),
      );
      setScheduleDirty(false);
    } finally {
      setSavingSchedule(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    await archiveCatalogProduct(selectedProduct.id);
    resetProduct();
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    await archiveCatalogCategory(selectedCategory.slug);
    resetCategory();
  };

  const handleDeleteVoucher = async () => {
    if (!selectedVoucher) return;
    await archiveCatalogVoucher(selectedVoucher.code);
    resetVoucher();
  };

  const updateColorDraft = (index: number, key: keyof ColorFormState, value: string | boolean) => {
    setScheduleDirty(true);
    setColorDrafts((current) =>
      current.map((entry, entryIndex) => (entryIndex === index ? { ...entry, [key]: value } : entry)),
    );
  };

  const addColorDraft = () => {
    setScheduleDirty(true);
    setColorDrafts((current) => [...current, colorEntryToForm()]);
  };

  const removeColorDraft = (index: number) => {
    setScheduleDirty(true);
    setColorDrafts((current) => current.filter((_, entryIndex) => entryIndex !== index));
  };

  const renderOverview = () => (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)]">
      <div className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label}>
              <StatCard label={stat.label} value={stat.value} icon={stat.icon} />
            </div>
          ))}
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-white/45">Shared layer</p>
              <h3 className="mt-2 font-display text-xl font-black uppercase tracking-tight text-white">
                One catalog, two surfaces
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
                These edits target the same Firestore collections that the storefront reads from, so product updates and admin changes stay in sync instead of drifting apart.
              </p>
            </div>
            <ShieldCheck className="h-6 w-6 text-[#8fe3c0]" />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/40">Current focus</p>
              <div className="mt-2 font-display text-lg font-black uppercase text-white">Catalog curation</div>
              <p className="mt-2 text-sm leading-6 text-white/64">
                Products, categories, vouchers, and color drops are editable directly from here.
              </p>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-black/20 p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/40">Firestore note</p>
              <div className="mt-2 font-display text-lg font-black uppercase text-white">Rules still matter</div>
              <p className="mt-2 text-sm leading-6 text-white/64">
                The UI is ready, but your Firestore security rules still need an admin-safe write policy before these actions can persist in production.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Quick actions</p>
              <h3 className="mt-2 font-display text-xl font-black uppercase tracking-tight text-white">
                Jump straight into edits
              </h3>
            </div>
            <Database className="h-6 w-6 text-white/75" />
          </div>

          <div className="mt-4 grid gap-3">
            {tabs.slice(1).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left transition hover:bg-white/[0.08]"
              >
                <span className="flex items-center gap-3">
                  <span className="rounded-2xl border border-white/10 bg-white/[0.08] p-2 text-white">
                    <tab.icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-white">{tab.label}</span>
                    <span className="block text-xs text-white/55">Open this section</span>
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 text-white/40" />
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Selected item</p>
          <div className="mt-3 space-y-3 text-sm text-white/70">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="font-display text-lg font-black uppercase text-white">Products</div>
              <div className="mt-1">{selectedProduct ? selectedProduct.name : "No product selected"}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="font-display text-lg font-black uppercase text-white">Categories</div>
              <div className="mt-1">{selectedCategory ? selectedCategory.name : "No category selected"}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="font-display text-lg font-black uppercase text-white">Vouchers</div>
              <div className="mt-1">{selectedVoucher ? selectedVoucher.code : "No voucher selected"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="grid gap-5 xl:grid-cols-[minmax(320px,0.95fr)_minmax(0,1.05fr)]">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Library</p>
            <h3 className="mt-2 font-display text-xl font-black uppercase tracking-tight text-white">Saved products</h3>
          </div>
          <AdminButton tone="ghost" icon={Plus} onClick={resetProduct}>
            New
          </AdminButton>
        </div>

        <div className="mt-4 space-y-3 max-h-[680px] overflow-y-auto pr-1">
          {productsLoading ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/45">
              Loading products...
            </div>
          ) : (
            products.map((product) => {
              const isActive = product.id === selectedProductId;
              return (
                <button
                  key={product.id}
                  onClick={() => setSelectedProductId(product.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    isActive ? "border-[#ff5790]/40 bg-[#ff5790]/10" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-sm font-black uppercase tracking-tight text-white">{product.name}</div>
                      <div className="mt-1 text-xs text-white/55">{product.id}</div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                      {product.status ?? "active"}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
        <SectionHeader
          title={selectedProduct ? "Edit product" : "Create product"}
          subtitle="The product form persists directly to the shared Firestore documents."
          action={
            <div className="flex gap-2">
              <AdminButton tone="ghost" icon={Archive} onClick={handleDeleteProduct} disabled={!selectedProduct}>
                Archive
              </AdminButton>
              <AdminButton tone="primary" icon={Save} onClick={handleSaveProduct} disabled={savingProduct}>
                {savingProduct ? "Saving" : "Save"}
              </AdminButton>
            </div>
          }
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <InputField label="Product ID" value={productForm.id} onChange={(value) => setProductField("id", value)} placeholder="summer-floral-dress" />
          <InputField label="Name" value={productForm.name} onChange={(value) => setProductField("name", value)} placeholder="Summer Floral Dress" />
          <InputField label="Price" type="number" value={productForm.price} onChange={(value) => setProductField("price", value)} placeholder="36000" />
          <InputField label="Compare-at Price" type="number" value={productForm.compareAtPrice} onChange={(value) => setProductField("compareAtPrice", value)} placeholder="52000" />
          <InputField label="Category" value={productForm.category} onChange={(value) => setProductField("category", value)} placeholder="shoes or bags" />
          <InputField label="Sub Type" value={productForm.subType} onChange={(value) => setProductField("subType", value)} placeholder="dress or two-piece" />
          <InputField label="Color Tag" value={productForm.colorTag} onChange={(value) => setProductField("colorTag", value)} placeholder="#ff5790" />
          <InputField label="Rating" type="number" value={productForm.rating} onChange={(value) => setProductField("rating", value)} placeholder="4.8" />
          <InputField label="Review Count" type="number" value={productForm.reviewCount} onChange={(value) => setProductField("reviewCount", value)} placeholder="42" />
          <InputField label="Stock Threshold" type="number" value={productForm.stockThreshold} onChange={(value) => setProductField("stockThreshold", value)} placeholder="10" />
          <InputField label="Status" value={productForm.status} onChange={(value) => setProductField("status", value)} placeholder="active" />
          <InputField label="Colors" value={productForm.colors} onChange={(value) => setProductField("colors", value)} placeholder="#ff5790, #202020" />
          <InputField label="Sizes" value={productForm.sizes} onChange={(value) => setProductField("sizes", value)} placeholder="XS, S, M, L" />
          <InputField label="Tags" value={productForm.tags} onChange={(value) => setProductField("tags", value)} placeholder="New Arrival, Best Seller" />
        </div>

        <div className="mt-4 grid gap-4">
          <TextAreaField
            label="Description"
            value={productForm.description}
            onChange={(value) => setProductField("description", value)}
            placeholder="Describe the garment, materials, and styling notes."
            rows={5}
          />
          <TextAreaField
            label="Image URLs"
            value={productForm.images}
            onChange={(value) => setProductField("images", value)}
            placeholder="Paste one URL per line"
            rows={4}
          />
        </div>
      </div>
    </div>
  );

  const renderCategories = () => (
    <div className="grid gap-5 xl:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)]">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Library</p>
            <h3 className="mt-2 font-display text-xl font-black uppercase tracking-tight text-white">Saved categories</h3>
          </div>
          <AdminButton tone="ghost" icon={Plus} onClick={resetCategory}>
            New
          </AdminButton>
        </div>

        <div className="mt-4 space-y-3">
          {categoriesLoading ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/45">
              Loading categories...
            </div>
          ) : (
            categories.map((category) => {
              const isActive = category.slug === selectedCategorySlug;
              return (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategorySlug(category.slug)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    isActive ? "border-[#8fe3c0]/40 bg-[#8fe3c0]/10" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-sm font-black uppercase tracking-tight text-white">{category.name}</div>
                      <div className="mt-1 text-xs text-white/55">{category.slug}</div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                      {category.active === false ? "disabled" : "live"}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
        <SectionHeader
          title={selectedCategory ? "Edit category" : "Create category"}
          subtitle="Categories are keyed by slug, which keeps storefront navigation and admin edits aligned."
          action={
            <div className="flex gap-2">
              <AdminButton tone="ghost" icon={Archive} onClick={handleDeleteCategory} disabled={!selectedCategory}>
                Archive
              </AdminButton>
              <AdminButton tone="primary" icon={Save} onClick={handleSaveCategory} disabled={savingCategory}>
                {savingCategory ? "Saving" : "Save"}
              </AdminButton>
            </div>
          }
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <InputField label="Slug" value={categoryForm.slug} onChange={(value) => setCategoryField("slug", value)} placeholder="dresses" />
          <InputField label="Name" value={categoryForm.name} onChange={(value) => setCategoryField("name", value)} placeholder="Dresses" />
          <InputField label="Item Count" type="number" value={categoryForm.itemCount} onChange={(value) => setCategoryField("itemCount", value)} placeholder="70" />
          <InputField label="Emoji" value={categoryForm.emoji} onChange={(value) => setCategoryField("emoji", value)} placeholder="👗" />
        </div>
        <div className="mt-4 grid gap-4">
          <InputField label="Image URL" value={categoryForm.image} onChange={(value) => setCategoryField("image", value)} placeholder="https://..." />
          <ToggleField
            label="Active"
            checked={categoryForm.active}
            onChange={(value) => setCategoryField("active", value)}
            description="Inactive categories stay archived from storefront view."
          />
        </div>
      </div>
    </div>
  );

  const renderVouchers = () => (
    <div className="grid gap-5 xl:grid-cols-[minmax(320px,0.9fr)_minmax(0,1.1fr)]">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Library</p>
            <h3 className="mt-2 font-display text-xl font-black uppercase tracking-tight text-white">Saved vouchers</h3>
          </div>
          <AdminButton tone="ghost" icon={Plus} onClick={resetVoucher}>
            New
          </AdminButton>
        </div>

        <div className="mt-4 space-y-3">
          {vouchersLoading ? (
            <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/45">
              Loading vouchers...
            </div>
          ) : (
            vouchers.map((voucher) => {
              const isActive = voucher.code === selectedVoucherCode;
              return (
                <button
                  key={voucher.code}
                  onClick={() => setSelectedVoucherCode(voucher.code)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    isActive ? "border-[#ffd66e]/40 bg-[#ffd66e]/10" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-display text-sm font-black uppercase tracking-tight text-white">{voucher.code}</div>
                      <div className="mt-1 text-xs text-white/55">{voucher.description}</div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white/70">
                      {voucher.active === false ? "disabled" : "live"}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
        <SectionHeader
          title={selectedVoucher ? "Edit voucher" : "Create voucher"}
          subtitle="Voucher documents are keyed by code, so the storefront and support team can reference the same code names."
          action={
            <div className="flex gap-2">
              <AdminButton tone="ghost" icon={Archive} onClick={handleDeleteVoucher} disabled={!selectedVoucher}>
                Archive
              </AdminButton>
              <AdminButton tone="primary" icon={Save} onClick={handleSaveVoucher} disabled={savingVoucher}>
                {savingVoucher ? "Saving" : "Save"}
              </AdminButton>
            </div>
          }
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <InputField label="Code" value={voucherForm.code} onChange={(value) => setVoucherField("code", value)} placeholder="SAVE10" />
          <InputField label="Value" type="number" value={voucherForm.value} onChange={(value) => setVoucherField("value", value)} placeholder="10" />
          <InputField
            label="Discount Type"
            value={voucherForm.discountType}
            onChange={(value) => setVoucherField("discountType", value as VoucherFormState["discountType"])}
            placeholder="percent"
          />
          <InputField label="Expiry Days" type="number" value={voucherForm.expiryDays} onChange={(value) => setVoucherField("expiryDays", value)} placeholder="7" />
          <InputField label="Emoji" value={voucherForm.emoji} onChange={(value) => setVoucherField("emoji", value)} placeholder="🎁" />
          <InputField label="Usage Limit" type="number" value={voucherForm.usageLimit} onChange={(value) => setVoucherField("usageLimit", value)} placeholder="100" />
          <InputField label="Used Count" type="number" value={voucherForm.usedCount} onChange={(value) => setVoucherField("usedCount", value)} placeholder="0" />
          <InputField label="Expires At" value={voucherForm.expiresAt} onChange={(value) => setVoucherField("expiresAt", value)} placeholder="2026-07-01" />
        </div>
        <div className="mt-4 grid gap-4">
          <TextAreaField label="Description" value={voucherForm.description} onChange={(value) => setVoucherField("description", value)} placeholder="10% off your entire order" rows={4} />
          <ToggleField
            label="Active"
            checked={voucherForm.active}
            onChange={(value) => setVoucherField("active", value)}
            description="Inactive vouchers are hidden from the storefront."
          />
        </div>
      </div>
    </div>
  );

  const renderColors = () => (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
      <SectionHeader
        title="Color rotation"
        subtitle="This is the shared color-of-the-day schedule used by both storefront and admin views."
        action={
          <div className="flex gap-2">
            <AdminButton tone="ghost" icon={CirclePlus} onClick={addColorDraft}>
              Add Slot
            </AdminButton>
            <AdminButton tone="primary" icon={Save} onClick={handleSaveSchedule} disabled={savingSchedule}>
              {savingSchedule ? "Saving" : "Save Schedule"}
            </AdminButton>
          </div>
        }
      />

      <div className="mt-5 space-y-4">
        {scheduleLoading ? (
          <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/45">
            Loading color rotation...
          </div>
        ) : (
          colorDrafts.map((entry, index) => (
            <div key={`${entry.color}-${index}`} className="rounded-[26px] border border-white/10 bg-black/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl border border-white/10" style={{ backgroundColor: entry.hex }} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">Slot {index + 1}</p>
                    <div className="font-display text-lg font-black uppercase tracking-tight text-white">{entry.color || "Untitled color"}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ToggleField label="Active" checked={entry.active} onChange={(value) => updateColorDraft(index, "active", value)} />
                  <AdminButton tone="ghost" icon={X} onClick={() => removeColorDraft(index)}>
                    Remove
                  </AdminButton>
                </div>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <InputField label="Color" value={entry.color} onChange={(value) => updateColorDraft(index, "color", value)} placeholder="Blush Pink" />
                <InputField label="Hex" value={entry.hex} onChange={(value) => updateColorDraft(index, "hex", value)} placeholder="#ff5790" />
                <InputField
                  label="Product IDs"
                  value={entry.productIds}
                  onChange={(value) => updateColorDraft(index, "productIds", value)}
                  placeholder="dr-001, tp-002"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
      <SectionHeader
        title="Reviews"
        subtitle="The admin panel can remove reviews from Firestore, while the storefront still renders approved seed data plus remote edits."
        action={<AdminButton tone="ghost" icon={RefreshCcw} onClick={() => window.location.reload()}>Refresh</AdminButton>}
      />

      <div className="mt-5 space-y-3">
        {reviewsLoading ? (
          <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/45">
            Loading reviews...
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="rounded-[24px] border border-white/10 bg-black/20 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-sm font-black uppercase tracking-tight text-white">{review.userName}</div>
                  <div className="mt-1 text-xs text-white/55">{review.productId}</div>
                  <p className="mt-3 text-sm leading-6 text-white/70">{review.comment}</p>
                </div>
                <AdminButton tone="danger" icon={Trash2} onClick={() => deleteReview(review.id)}>
                  Delete
                </AdminButton>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-white/65">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-black uppercase tracking-[0.18em] text-white/70">
                  Rating {review.rating}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-black uppercase tracking-[0.18em] text-white/70">
                  {review.timeAgo}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,87,144,0.18)_0%,_rgba(9,9,9,0)_42%),linear-gradient(180deg,#090909_0%,#111111_100%)] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.05] px-5 py-4 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/45">Admin panel</p>
                <h1 className="mt-1 font-display text-2xl font-black uppercase tracking-tight text-white">Shared catalog control room</h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/65">
                <ShieldCheck className="h-3.5 w-3.5 text-[#8fe3c0]" />
                Signed in
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/65">
                <RefreshCcw className="h-3.5 w-3.5" />
                Firestore linked
              </span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] transition ${
                    active ? "border-white bg-white text-[#111]" : "border-white/10 bg-white/[0.05] text-white/70 hover:bg-white/[0.08]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "products" && renderProducts()}
          {activeTab === "categories" && renderCategories()}
          {activeTab === "vouchers" && renderVouchers()}
          {activeTab === "colors" && renderColors()}
          {activeTab === "reviews" && renderReviews()}
        </div>
      </div>
    </div>
  );
}
