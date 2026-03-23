import { useState } from "react";
import Layout from "@/components/Layout";
import AnimatedSection from "@/components/AnimatedSection";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { t } = useLanguage();
  // 定义收件人邮箱
  const recipientEmail = "ql.animation@gmail.com";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 基础验证：确保必填项都已填写
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t("contact", "requiredFields") || "Please fill in all required fields");
      return;
    }

    // 构建mailto链接，自动填充收件人、主题、正文
    const emailSubject = encodeURIComponent(`Message from ${formData.name}`); // 邮件主题（含用户名）
    const emailBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    ); // 邮件正文（拼接用户信息）
    const mailtoLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;

    // 唤起默认邮箱客户端
    window.location.href = mailtoLink;

    // 提示用户并清空表单
    toast.success(t("contact", "emailOpened") || "Email client opened successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section className="pt-16 sm:pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 md:gap-16">
            <AnimatedSection>
              <div className="bg-card rounded-lg p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-3">{t("contact", "title")}</h1>
                <p className="text-muted-foreground mb-8 text-sm">
                  {t("contact", "subtitle")}
                </p>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div>
                    <label className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground/80 mb-2 block">
                      {t("contact", "name")}
                    </label>
                    <input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      maxLength={100}
                      placeholder={t("contact", "namePlaceholder")}
                      className="w-full bg-secondary text-foreground px-4 py-3 rounded text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground/80 mb-2 block">
                      {t("contact", "email")}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      maxLength={255}
                      placeholder={t("contact", "emailPlaceholder")}
                      className="w-full bg-secondary text-foreground px-4 py-3 rounded text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground/80 mb-2 block">
                      {t("contact", "message")}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      maxLength={1000}
                      rows={6}
                      placeholder={t("contact", "messagePlaceholder")}
                      className="w-full bg-secondary text-foreground px-4 py-3 rounded text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-ring resize-none transition-shadow"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-muted hover:bg-muted/80 text-foreground font-semibold tracking-[0.15em] uppercase text-xs py-3 rounded transition-colors"
                  >
                    {t("contact", "send")}
                  </button>
                </form>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="pt-0 md:pt-4 space-y-10">
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground/80 mb-4">
                    {t("contact", "office")}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm whitespace-pre-line">
                    {t("contact", "officeAddress")}
                  </p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-foreground/80 mb-4">
                    {t("contact", "contactLabel")}
                  </h3>
                  {/* 优化：静态邮箱地址也添加mailto链接 */}
                  <a
                    href={`mailto:${recipientEmail}`}
                    className="text-foreground hover:underline text-sm"
                  >
                    ql.animation@gmail.com
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;