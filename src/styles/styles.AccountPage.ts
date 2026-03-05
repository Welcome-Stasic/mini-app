import styled from "@emotion/styled";

export const AccountContainer = styled.div<{ isEditing: boolean }>`
  ${(props) => props.isEditing && `background: white;`}
`;

export const AccountCard = styled.div`
  padding: 16px;
  padding-bottom: 76px;
  background: white;
  border-radius: 16px;
`;

export const AccountHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AccountHeaderActions = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  display: flex;
  gap: 8px;
  z-index: 5;
`;

export const AccountAction = styled.button`
  width: 48px;
  height: 48px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: #c3f8ff1a
  color: #111827;



  &.save {
    background: #007AFF;
    color: white;
  }
    &.cancel {
    background: #4378FF1A;
    color: #007AFF;
   
  }
`;

export const AccountAvatarWrapper = styled.div`
  display: grid;
  place-items: center;
`;

export const AccountAvatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
`;

export const AccountChangePhoto = styled.button`
  margin: 8px 0 10px;
  font-size: 15px;
  color: #1f6feb;
  background: none;
  border: none;
  cursor: pointer;
`;

export const AccountName = styled.div`
  text-align: center;
`;

export const AccountFullname = styled.div`
  font-weight: 500;
  font-size: 17px;
  line-height: 153%;
`;

export const AccountMeta = styled.div`
  color: #6b7280;
  font-size: 16px;
  line-height: 150%;
`;

export const Field = styled.div`
  position: relative;
  margin-top: 12px;
`;

export const FieldLabel = styled.label<{
  isEditing?: boolean;
  isFocused?: boolean;
}>`
  position: absolute;
  left: 12px;
  top: 0;
  transform: translateY(-50%);
  background: white;
  padding: 0 6px;
  color: #9ca3af;
  color: ${(props) => {
    if (props.isFocused) return "#1f6feb";
    if (props.isEditing) return "#9ca3af";
  }};
  font-size: 15px;
  line-height: 1;
  pointer-events: none;
  transition: color 0.2s ease;
`;

export const Input = styled.input<{ isEditing?: boolean }>`
  width: 100%;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  color: #111827;
  font-size: 16px;
  line-height: 150%;
  box-sizing: border-box;

  &:focus {
    border-color: #1f6feb;

    outline: none;
  }

  ${(props) =>
    props.isEditing &&
    `
    &:focus {
      border-color: #1f6feb;
      outline: none;
    }
  `}

  &[disabled], &[readonly] {
    color: #111827 !important;
    background: white !important;
    cursor: default;
  }
`;

export const TextareaWrapper = styled.div<{ isEditing?: boolean }>`
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  overflow-y: auto;
  margin-bottom: 20px;

  ${(props) =>
    props.isEditing &&
    `
    &:focus-within {
      border-color: #1f6feb;
    }
  `}
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 135px;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  font-size: 16px;
  line-height: 150%;
  color: #111827;
`;

export const WebsiteField = styled.div`
  margin-top: 30px;
`;

export const WebsiteInput = styled.input<{
  isEditing?: boolean;
  readOnly?: boolean;
}>`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 10px;
  background: rgba(67, 120, 255, 0.05);
  color: #1f6feb;
  font-size: 16px;
  line-height: 150%;
  cursor: ${(props) => (props.readOnly ? "pointer" : "text")};
  transition: all 0.2s ease;

  ${(props) =>
    props.isEditing &&
    `
    border: 2px solid #e5e7eb;
    background: white;
    color: #111827;
    cursor: text;

    &:focus {
      border-color: #1f6feb;
      outline: none;

    }

  }
  `}
`;

export const CopyButton = styled.button<{ copied?: boolean }>`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
`;

export const EditCheckboxList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
`;

export const EditCheckboxItem = styled.label<{ checked: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  background: ${(props) => (props.checked ? "#eef2ff" : "#f3f4f6")};
  color: #4b5563;
  cursor: pointer;
`;

export const AccountTagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
`;

export const AccountTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
`;

export const TagsBox = styled.div`
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  padding: 24px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 48px;
`;

export const TechTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
`;

export const RemoveTag = styled.button`
  background: none;
  border: none;
  color: #707579;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  padding-left: -12px;
`;

export const TechInput = styled.input`
  width: 100%;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  background: white;
  padding: 16px;

  &:focus {
    border-color: #1f6feb;
    outline: none;
  }

  &::placeholder {
    color: #adb1b6;
  }
`;

export const AddButton = styled.button`
  padding: 12px 28px;
  background: #4378ff1a;
  color: #007aff;
  border: none;
  border-radius: 14px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  align-self: flex-start;
  width: 100%;
`;

export const DirectionEditContainer = styled.div<{ isEditing?: boolean }>`
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: #f9fafb;
  padding: 12px 14px;
  margin-top: 30px;
  transition: all 0.2s ease;

  ${(props) =>
    props.isEditing &&
    `
    background: white;

    &:focus-within {
      border-color: #1f6feb;

    }
  `}
`;

export const Select = styled.select<{ isEditing?: boolean }>`
  width: 100%;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 16px;
  line-height: 150%;
  background: white;
  color: #111827;

  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  padding-right: 40px;

  &:focus {
    outline: none;
  }

  ${({ isEditing }) =>
    isEditing &&
    `
    &:focus {
      border-color: #1f6feb;

    }
  `}
`;
