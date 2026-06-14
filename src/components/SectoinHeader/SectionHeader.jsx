import { useNavigate } from "react-router-dom"

const SectionHeader = ({ title ,label}) => {
  const navigate = useNavigate()

  return (
    <div className="sectionHeader">
      <h1>{title}</h1>
      <button
        onClick={() => navigate("/products")}
        className="outlineBtn"
        aria-label={label}
      >
        مشاهدة المزيد
      </button>
    </div>
  )
}

export default SectionHeader
