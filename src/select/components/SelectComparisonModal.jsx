// src/compare/components/SelectComparisonModal.jsx
import { useState, useEffect } from "react";
import { compareController } from "../controller/selectController";
import { CompanyCard } from "./CompanyCard";
import { Modal } from "./Modal";

export const SelectComparisonModal = ({
  isOpen,
  onClose,
  onConfirm,
  maxCount = 5,
}) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState(new Set());
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

  const handleSelect = (companyId) => {
    const newSelected = new Set(selectedCompanies);
    if (newSelected.has(companyId)) {
      newSelected.delete(companyId);
    } else if (newSelected.size < maxCount) {
      newSelected.add(companyId);
    }
    setSelectedCompanies(newSelected);
  };

  const handleConfirm = () => {
    if (selectedCompanies.size > 0) {
      onConfirm(Array.from(selectedCompanies));
      setSelectedCompanies(new Set());
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} title="비교할 기업 선택하기" onClose={onClose}>
      <div className="selection-count">
        선택: {selectedCompanies.size} / {maxCount}
      </div>

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
            isSelected={selectedCompanies.has(company.id)}
            onSelect={() => handleSelect(company.id)}
          />
        ))}
      </div>

      <div className="modal-footer">
        <button
          onClick={handleConfirm}
          className="confirm-btn"
          disabled={selectedCompanies.size === 0}
        >
          선택 완료
        </button>
      </div>
    </Modal>
  );
};
