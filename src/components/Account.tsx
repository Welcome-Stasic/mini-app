import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "../styles/styles.AccountPage.ts";
import { IconCop, IconCopy, IconEdit } from "../icon/icons.tsx";

import type { UserProfile } from "../types/user";
import { RouteName } from "../router/routes.tsx";
import { useStore } from "../store/storeProvider.tsx";
import { observer } from "mobx-react-lite";

const Account = observer(() => {
  const { userStore } = useStore();
  const user = userStore.user;

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: user?.fullName ?? "",
    age: String(user?.age ?? ""),
    course: user?.course ?? "",
    website: user?.website ?? "",
    username: user?.username ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    about: user?.about ?? "",
    techStack: (user?.techStack ?? []).join(", "),
  });

  const [directionTags, setDirectionTags] = useState<string[]>(
    user?.direction?.split(/[,;/]\s*/).filter(Boolean) ?? ["Frontend"],
  );

  const [techTags, setTechTags] = useState<string[]>(user?.techStack ?? []);

  const [tagInput, setTagInput] = useState("");

  const AVAILABLE_DIRECTIONS = ["Frontend", "Backend", "UX/UI"] as const;

  const updateField = <K extends keyof typeof form>(key: K, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditStart = () => {
    setIsEditing(true);
    navigate(RouteName.ACCOUNT, {
      state: { isEditing: true },
      replace: true,
    });
  };

  const handleEditEnd = () => {
    setIsEditing(false);
    navigate(RouteName.ACCOUNT, {
      state: { isEditing: false },
      replace: true,
    });
  };

  const handleCancel = () => {
    handleEditEnd();
    setForm({
      fullName: user?.fullName ?? "",
      age: String(user?.age ?? ""),
      course: user?.course ?? "",
      website: user?.website ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      about: user?.about ?? "",
      techStack: (user?.techStack ?? []).join(", "),
    });
    setDirectionTags(
      user?.direction?.split(/[,;/]\s*/).filter(Boolean) ?? ["Frontend"],
    );
    setTechTags(user?.techStack ?? []);
  };

  const handleSave = () => {
    if (!user) return;

    const updates: Partial<UserProfile> = {
      fullName: form.fullName.trim() || undefined,
      age: form.age ? Number(form.age) : undefined,
      direction: directionTags.length ? directionTags.join(", ") : undefined,
      course: form.course || undefined,
      website: form.website.trim() || undefined,
      username: form.username.trim() || undefined,
      email: form.email.trim() || undefined,
      phone: form.phone.trim() || undefined,
      about: form.about.trim() || undefined,
      techStack: techTags.length ? techTags : undefined,
    };

    userStore.updateUserProfile(updates);
    handleEditEnd();
  };

  if (!user) {
    return <div style={{ padding: 16 }}>Вы не авторизованы.</div>;
  }

  return (
    <S.AccountContainer isEditing={isEditing}>
      <S.AccountCard>
        <S.AccountHeader>
          <S.AccountHeaderActions>
            {!isEditing ? (
              <S.AccountAction onClick={handleEditStart}>
                <IconEdit />
              </S.AccountAction>
            ) : (
              <>
                <S.AccountAction className="cancel" onClick={handleCancel}>
                  ✕
                </S.AccountAction>
                <S.AccountAction className="save" onClick={handleSave}>
                  ✓
                </S.AccountAction>
              </>
            )}
          </S.AccountHeaderActions>

          <S.AccountAvatarWrapper>
            <S.AccountAvatar src={user.avatarUrl} alt={user.fullName} />
          </S.AccountAvatarWrapper>

          {isEditing && (
            <S.AccountChangePhoto onClick={() => fileInputRef.current?.click()}>
              Выбрать новую фотографию
            </S.AccountChangePhoto>
          )}

          <S.AccountName>
            {isEditing ? (
              <>
                <S.Field>
                  <S.FieldLabel
                    isEditing={isEditing}
                    isFocused={focusedField === "fullName"}
                  >
                    ФИО
                  </S.FieldLabel>
                  <S.Input
                    isEditing={isEditing}
                    value={form.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                  />
                </S.Field>

                <S.Field>
                  <S.DirectionEditContainer isEditing={isEditing}>
                    <S.FieldLabel
                      isEditing={isEditing}
                      isFocused={focusedField === "direction"}
                    >
                      Направление
                    </S.FieldLabel>
                    <S.EditCheckboxList>
                      {AVAILABLE_DIRECTIONS.map((opt) => {
                        const checked = directionTags.includes(opt);
                        return (
                          <S.EditCheckboxItem key={opt} checked={checked}>
                            <input
                              type="checkbox"
                              checked={checked}
                              onFocus={() => setFocusedField("direction")}
                              onBlur={() => setFocusedField(null)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setDirectionTags((prev) => [...prev, opt]);
                                } else {
                                  setDirectionTags((prev) =>
                                    prev.filter((v) => v !== opt),
                                  );
                                }
                              }}
                            />
                            <span>{opt}</span>
                          </S.EditCheckboxItem>
                        );
                      })}
                    </S.EditCheckboxList>
                  </S.DirectionEditContainer>
                </S.Field>

                <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                  <S.Field style={{ flex: 1 }}>
                    <S.FieldLabel
                      isEditing={isEditing}
                      isFocused={focusedField === "age"}
                    >
                      Возраст
                    </S.FieldLabel>
                    <S.Input
                      isEditing={isEditing}
                      type="number"
                      min={14}
                      max={25}
                      value={form.age}
                      onFocus={() => setFocusedField("age")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === "" || (+val >= 14 && +val <= 25)) {
                          updateField("age", val);
                        }
                      }}
                      style={{
                        appearance: "none",
                        WebkitAppearance: "none",
                        MozAppearance: "none",
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                        backgroundSize: "16px",
                        paddingRight: "40px",
                      }}
                    />
                  </S.Field>

                  <S.Field style={{ flex: 1, position: "relative" }}>
                    <S.FieldLabel
                      isEditing={isEditing}
                      isFocused={focusedField === "course"}
                    >
                      Курс
                    </S.FieldLabel>
                    <S.Select
                      isEditing={isEditing}
                      value={form.course}
                      onFocus={() => setFocusedField("course")}
                      onBlur={() => setFocusedField(null)}
                      onChange={(e) => updateField("course", e.target.value)}
                    >
                      <option value="">Выбери курс</option>
                      <option value="1 курс">1 курс</option>
                      <option value="2 курс">2 курс</option>
                      <option value="3 курс">3 курс</option>
                      <option value="4 курс">4 курс</option>
                    </S.Select>
                  </S.Field>
                </div>
              </>
            ) : (
              <>
                <S.AccountFullname>{user.fullName}</S.AccountFullname>
                <S.AccountMeta>
                  {user.age} лет — {user.direction} — {user.course}
                </S.AccountMeta>
              </>
            )}
          </S.AccountName>
        </S.AccountHeader>

        <S.Field>
          <S.WebsiteField>
            {isEditing && (
              <S.FieldLabel
                isEditing={isEditing}
                isFocused={focusedField === "website"}
              >
                Ссылка на портфолио
              </S.FieldLabel>
            )}
            <S.WebsiteInput
              isEditing={isEditing}
              placeholder="url"
              readOnly={!isEditing}
              value={isEditing ? form.website : (user.website ?? "")}
              onFocus={() => setFocusedField("website")}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => updateField("website", e.target.value)}
              onClick={() => {
                if (!isEditing && user?.website) {
                  window.open(user.website, "_blank");
                }
              }}
            />
            {!isEditing && user.website && (
              <S.CopyButton
                copied={isCopied}
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    await navigator.clipboard.writeText(user?.website || "");
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  } catch {}
                }}
              >
                {isCopied ? <IconCop /> : <IconCopy />}
              </S.CopyButton>
            )}
          </S.WebsiteField>
        </S.Field>

        <div style={{ display: "grid", gap: "20px", marginTop: "16px" }}>
          {(["username", "email", "phone"] as const).map((key) => (
            <S.Field key={key}>
              <S.FieldLabel
                isEditing={isEditing}
                isFocused={focusedField === key}
              >
                {key === "username"
                  ? "Username"
                  : key === "email"
                    ? "Почта"
                    : "Телефон"}
              </S.FieldLabel>
              <S.Input
                isEditing={isEditing}
                disabled={!isEditing}
                value={isEditing ? form[key] : (user[key] ?? "")}
                onFocus={() => setFocusedField(key)}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => updateField(key, e.target.value)}
              />
            </S.Field>
          ))}

          <S.Field>
            <S.FieldLabel
              isEditing={isEditing}
              isFocused={focusedField === "about"}
            >
              О себе
            </S.FieldLabel>
            <S.TextareaWrapper isEditing={isEditing}>
              <S.Textarea
                disabled={!isEditing}
                value={isEditing ? form.about : (user.about ?? "")}
                onFocus={() => setFocusedField("about")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => updateField("about", e.target.value)}
              />
            </S.TextareaWrapper>
          </S.Field>
        </div>

        {isEditing ? (
          <S.Field>
            <S.FieldLabel isEditing={isEditing}>Стек технологий</S.FieldLabel>
            <S.TagsBox>
              {techTags.map((t) => (
                <S.TechTag key={t}>
                  #{t}
                  <S.RemoveTag
                    onClick={() =>
                      setTechTags((prev) => prev.filter((x) => x !== t))
                    }
                  >
                    ×
                  </S.RemoveTag>
                </S.TechTag>
              ))}
            </S.TagsBox>
            <S.Field style={{ marginTop: "30px" }}>
              <S.FieldLabel
                isEditing={isEditing}
                isFocused={focusedField === "techStack"}
              >
                Технология
              </S.FieldLabel>
              <S.TechInput
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="1C"
                onFocus={() => setFocusedField("techStack")}
                onBlur={() => setFocusedField(null)}
                onKeyDown={(e) => {
                  if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
                    e.preventDefault();
                    const val = tagInput.trim();
                    if (!techTags.includes(val)) {
                      setTechTags([...techTags, val]);
                    }
                    setTagInput("");
                  }
                }}
              />
            </S.Field>

            <S.AddButton
              type="button"
              onClick={() => {
                if (tagInput.trim()) {
                  const val = tagInput.trim();
                  if (!techTags.includes(val)) {
                    setTechTags([...techTags, val]);
                  }
                  setTagInput("");
                }
              }}
              disabled={!tagInput.trim()}
            >
              Добавить
            </S.AddButton>
          </S.Field>
        ) : (
          techTags.length > 0 && (
            <S.Field>
              <S.TagsBox>
                <S.FieldLabel isEditing={isEditing}>
                  Стек технологий
                </S.FieldLabel>
                <S.AccountTagsList>
                  {techTags.map((tag) => (
                    <S.AccountTag key={tag}>#{tag}</S.AccountTag>
                  ))}
                </S.AccountTagsList>
              </S.TagsBox>
            </S.Field>
          )
        )}
      </S.AccountCard>
    </S.AccountContainer>
  );
});

export default Account;
