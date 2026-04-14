import { useState, useEffect } from "react";
import { compareController } from "../controller/selectController";
import { CompanyCard } from "./CompanyCard";
import { Modal } from "./Modal";

export const SelectMyCompanyModal = ({ isOpen, onClose, onConfirm }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    if (isOpen) {
      compareController.getCompanies().then(setCompanies);
    }
  }, [isOpen]);

  const handleSearch = async (keyword) => {
    setSearchKeyword(keyword);
    if (keyword.trim()) {
      const results = await compareController.searchCompanies(keyword);
      setCompanies(results);
    } else {
      const allCompanies = await compareController.getCompanies();
      setCompanies(allCompanies);
    }
  };

  const handleConfirm = () => {
    if (selectedCompany) {
      onConfirm(selectedCompany);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} title="나의 기업 선택하기" onClose={onClose}>
      <input
        type="text"
        placeholder="기업명 검색..."
        value={searchKeyword}
        onChange={(e) => handleSearch(e.target.value)}
        className="search-input"
      />

      <div className="company-list">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            isSelected={selectedCompany?.id === company.id}
            onSelect={() => setSelectedCompany(company)}
          />
        ))}
      </div>

      <div className="modal-footer">
        <button onClick={handleConfirm} className="confirm-btn">
          선택 완료
        </button>
      </div>
    </Modal>
  );
};
