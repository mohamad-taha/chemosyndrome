import "./Breadcrumbs.css";

const Breadcrumbs = ({ title }) => {
  return (
    <div className="breadcrumbs mt">
      <h1>{title}</h1>
      <p>
        الرئيسية {">"} {title}{" "}
      </p>
    </div>
  );
};

export default Breadcrumbs;
