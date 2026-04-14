export const compareController = {
  // 상태 초기화
  initializeState: () => ({
    myCompany: null,
    comparisonCompanies: [],
    isMyCompanyModalOpen: false,
    isComparisonModalOpen: false,
    searchKeyword: "",
  }),

  // 나의 기업 추가
  addMyCompany: async (companyId) => {
    const response = await fetch("/api/my-companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyId }),
    });
    return response.json();
  },

  // 비교 기업 추가
  addComparisonCompanies: async (myCompanyId, companyIds) => {
    const response = await fetch("/api/comparison-companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ myCompanyId, companyIds }),
    });
    return response.json();
  },

  // 기업 검색
  searchCompanies: async (keyword) => {
    const response = await fetch(`/api/companies/search?q=${keyword}`);
    return response.json();
  },

  // 기업 목록 조회
  getCompanies: async () => {
    const response = await fetch("/api/companies");
    return response.json();
  },
};
