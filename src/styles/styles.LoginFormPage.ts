import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 10px;

  input {
    padding: 12px 16px;
    font-size: 16px;
    outline: none;
  }

  label {
    top: -10px;
    left: 8px;
    color: #a2acb0;
    font-weight: 600;
    font-size: 15px;
    line-height: 147%;
    letter-spacing: 0.01em;
  }
`;

export const InputWrapper = styled.div<{ error: boolean }>`
  width: 100%;
  position: relative;
  margin-bottom: 20px;

  input {
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: 0.01em;
    border: 2px solid rgba(0, 0, 0, 0.05);
    border-radius: 14px;
    12px 16px;
    margin-bottom: 8px;
  }

  label {
    position: absolute;
    left: 16px;
    top: 19px;
    color: #e6e6e6;
    background: #fff;
    padding: 0 4px;
    font-size: 16px;
    pointer-events: none;
    transition: 0.2s;
    z-index: 1;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    top: -10px;
    left: 8px;
    color: #007AFF;
    font-weight: 600;
    font-size: 15px;
    line-height: 147%;
    letter-spacing: 0.01em;
  }
 
  input:focus {
    border-color: #007AFF;
  }

  input:-webkit-autofill + label,
  input:-moz-autofill + label {
    top: 6px;
    transform: none;
    font-size: 12px;
    color: #555;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition:
      background-color 9999s ease-in-out 0s,
      color 9999s ease-in-out 0s;
    -webkit-text-fill-color: #000 !important;
  }

  ${({ error }) =>
    error &&
    css`
      input {
        border-color: #e53935 !important;
        border-width: 2px !important;
      }

      input:focus {
        border-color: #e53935 !important;
      }

      label {
        color: #e53935 !important;
      }
    `}
`;

export const InputHint = styled.div`
  position: static;
  color: #e53935;
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 8px;
  background: none;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  min-width: 0;
  max-width: 100%;
  opacity: 1;
  transition: opacity 0.2s;
  word-break: break-word;
  text-align: center;
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 24px;
  display: flex;
  justify-content: center;
  background: ${({ disabled }) => (disabled ? "#b3d1ff" : "#007aff")};
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 15px 12px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 17px;
  line-height: 153%;
  letter-spacing: 0.01em;
  text-align: center;
  color: #fff;
  border: 1px solid #e6e6e6;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.2s;
  pointer-events: auto;
`;

export const EyeButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 18px;
  color: #a2acb0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  &:hover {
    color: #646cff;
  }

  &:focus {
    outline: none;
  }
`;
