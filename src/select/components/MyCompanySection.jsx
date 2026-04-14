export const MyCompanySection = ({ myCompany, onAddClick }) => {
  return (
    <section className="my-company-section">
      {myCompany ? (
        <div className="my-company-display">
          <img src={myCompany.logo} alt={myCompany.name} />
          <h2>{myCompany.name}</h2>
        </div>
      ) : (
        <h2>나의 기업을 선택해주세요!</h2>
      )}

      <button onClick={onAddClick} className="add-company-btn">
        {myCompany ? "나의 기업 변경" : "나의 기업 추가"}
      </button>
    </section>
  );
};
