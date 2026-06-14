// ====================
// Imports
// ====================

import { CiWifiOff } from "react-icons/ci";
import { VscRefresh } from "react-icons/vsc";

import "./ErrorMsg.css";

// ====================
// Component: ErrorMsg
// ====================

const ErrorMsg = ({ refetch, msg }) => {

  return (
    <div className="errMsgBox">
      <CiWifiOff
        size={50}
        color="#838ef0"
        style={{ marginBottom: "1rem" }}
      />

      <p
        style={{
          margin: "0 0 1.5rem 0",
          color: "#718096",
          fontSize: "14px",
        }}
      >
        {msg}
      </p>

      <button
        className="primaryBtn"
        onClick={() => refetch()}
        aria-label="إعادة المحاولة"
      >
        <VscRefresh size={18} />
        إعادة المحاولة
      </button>
    </div>
  );
};

export default ErrorMsg;