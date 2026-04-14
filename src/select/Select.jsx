import { MOCK_CORPS } from "../mock/mockCorps"; //목업 데이터(종찬)

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrCreateSessionId, getSessionId } from "../utils/sessionManager";
import "./style/select.css";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
const MAX_COMPARISON = 5;
const MODAL_PAGE_SIZE = 6;

const getCompanyName = (company) =>
  company?.name || company?.companyName || "이름 없음";
const getCompanyCategory = (company) =>
  company?.category || company?.industry || "업종 미정";
const getCompanyLogo = (company) => company?.logo || company?.img || "";

export default function SelectPage() {
  const navigate = useNavigate();

  const [myCompany, setMyCompany] = useState(null);
  const [comparisonCompanies, setComparisonCompanies] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);

  const [isMyCompanyModalOpen, setIsMyCompanyModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  const [myCompanySearchKeyword, setMyCompanySearchKeyword] = useState("");
  const [comparisonSearchKeyword, setComparisonSearchKeyword] = useState("");
  const [selectedComparisonCompanies, setSelectedComparisonCompanies] =
    useState(new Set());

  const [comparisonModalPage, setComparisonModalPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        getOrCreateSessionId();
        await Promise.all([
          fetchAllCompanies(),
          fetchMyCompany(),
          fetchComparisonCompanies(),
        ]);
      } catch (err) {
        console.error(err);
        setError("초기 데이터 로딩에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const fetchAllCompanies = async () => {
    if (USE_MOCK) {
      setAllCompanies(MOCK_CORPS);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/companies`);
      if (!response.ok) throw new Error("기업 목록 조회 실패");
      const data = await response.json();
      setAllCompanies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("기업 목록 API 실패, 목업 데이터로 대체합니다.", err);
      setAllCompanies(MOCK_CORPS);
    }
  };

  const fetchMyCompany = async () => {
    try {
      const sessionId = getSessionId();
      const response = await fetch(
        `${API_BASE_URL}/my-selections?sessionId=${sessionId}`,
        {
          headers: { "X-Session-ID": sessionId },
        },
      );

      if (!response.ok) return;

      const data = await response.json();
      if (data?.corp) {
        setMyCompany(data.corp);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComparisonCompanies = async () => {
    try {
      const sessionId = getSessionId();
      const response = await fetch(
        `${API_BASE_URL}/comparison-selections?sessionId=${sessionId}`,
        {
          headers: { "X-Session-ID": sessionId },
        },
      );

      if (!response.ok) return;

      const data = await response.json();
      if (Array.isArray(data)) {
        setComparisonCompanies(
          data.map((item) => ({
            ...item.corp,
            _selectionId: item.id,
          })),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addMyCompany = async (company) => {
    if (USE_MOCK) {
      setMyCompany(company);
      setIsMyCompanyModalOpen(false);
      setMyCompanySearchKeyword("");
      setError("");
      return;
    }

    try {
      setIsLoading(true);
      const sessionId = getSessionId();

      const response = await fetch(`${API_BASE_URL}/my-selections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-ID": sessionId,
        },
        body: JSON.stringify({ corpId: company.id }),
      });

      if (!response.ok) throw new Error("나의 기업 선택 실패");

      const data = await response.json();
      setMyCompany(data?.corp || company);
      setIsMyCompanyModalOpen(false);
      setMyCompanySearchKeyword("");
      setError("");
    } catch (err) {
      console.error(err);
      setMyCompany(company);
      setIsMyCompanyModalOpen(false);
      setMyCompanySearchKeyword("");
      setError("API 저장은 실패했지만 화면에는 선택한 기업을 표시했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearMyCompany = async () => {
    if (USE_MOCK) {
      setMyCompany(null);
      setComparisonCompanies([]);
      setSelectedComparisonCompanies(new Set());
      setError("");
      return;
    }

    try {
      setIsLoading(true);
      const sessionId = getSessionId();

      const response = await fetch(
        `${API_BASE_URL}/my-selections?sessionId=${sessionId}`,
        {
          method: "DELETE",
          headers: { "X-Session-ID": sessionId },
        },
      );

      if (!response.ok) throw new Error("나의 기업 해제 실패");

      setMyCompany(null);
      setComparisonCompanies([]);
      setSelectedComparisonCompanies(new Set());
      setError("");
    } catch (err) {
      console.error(err);
      setMyCompany(null);
      setComparisonCompanies([]);
      setSelectedComparisonCompanies(new Set());
      setError("API 해제는 실패했지만 화면에서는 선택을 해제했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const addComparisonCompanies = async (companyIds) => {
    if (!companyIds.length) return;

    if (USE_MOCK) {
      const selected = allCompanies
        .filter((company) => companyIds.includes(company.id))
        .map((company) => ({ ...company, _selectionId: `mock-${company.id}` }));

      setComparisonCompanies((prev) => {
        const prevIds = new Set(prev.map((c) => c.id));
        const merged = [...prev];
        selected.forEach((c) => {
          if (!prevIds.has(c.id)) merged.push(c);
        });
        return merged;
      });

      setSelectedComparisonCompanies(new Set());
      setComparisonSearchKeyword("");
      setComparisonModalPage(1);
      setIsComparisonModalOpen(false);
      setError("");
      return;
    }

    try {
      setIsLoading(true);
      const sessionId = getSessionId();

      const response = await fetch(`${API_BASE_URL}/comparison-selections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-ID": sessionId,
        },
        body: JSON.stringify({ corpIds: companyIds }),
      });

      if (!response.ok) throw new Error("비교 기업 추가 실패");

      const data = await response.json();
      const newItems = Array.isArray(data) ? data : [data];

      const normalized = newItems.map((item) => ({
        ...item.corp,
        _selectionId: item.id,
      }));

      setComparisonCompanies((prev) => {
        const prevIds = new Set(prev.map((c) => c.id));
        const merged = [...prev];
        normalized.forEach((c) => {
          if (!prevIds.has(c.id)) merged.push(c);
        });
        return merged;
      });

      setSelectedComparisonCompanies(new Set());
      setComparisonSearchKeyword("");
      setComparisonModalPage(1);
      setIsComparisonModalOpen(false);
      setError("");
    } catch (err) {
      console.error(err);
      setError("비교 기업 추가에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeComparisonCompany = async (companyId) => {
    if (USE_MOCK) {
      setComparisonCompanies((prev) => prev.filter((c) => c.id !== companyId));
      setSelectedComparisonCompanies((prev) => {
        const next = new Set(prev);
        next.delete(companyId);
        return next;
      });
      setError("");
      return;
    }

    try {
      setIsLoading(true);
      const sessionId = getSessionId();

      const target = comparisonCompanies.find((c) => c.id === companyId);

      if (target?._selectionId) {
        const response = await fetch(
          `${API_BASE_URL}/comparison-selections/${target._selectionId}`,
          {
            method: "DELETE",
            headers: { "X-Session-ID": sessionId },
          },
        );

        if (!response.ok) throw new Error("비교 기업 삭제 실패");
      }

      setComparisonCompanies((prev) => prev.filter((c) => c.id !== companyId));
      setError("");
    } catch (err) {
      console.error(err);
      setError("비교 기업 삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetAllSelections = async () => {
    if (USE_MOCK) {
      setMyCompany(null);
      setComparisonCompanies([]);
      setSelectedComparisonCompanies(new Set());
      setError("");
      return;
    }

    try {
      setIsLoading(true);
      const sessionId = getSessionId();

      await Promise.all(
        comparisonCompanies
          .filter((c) => c._selectionId)
          .map((c) =>
            fetch(`${API_BASE_URL}/comparison-selections/${c._selectionId}`, {
              method: "DELETE",
              headers: { "X-Session-ID": sessionId },
            }),
          ),
      );

      await fetch(`${API_BASE_URL}/my-selections?sessionId=${sessionId}`, {
        method: "DELETE",
        headers: { "X-Session-ID": sessionId },
      });

      setMyCompany(null);
      setComparisonCompanies([]);
      setSelectedComparisonCompanies(new Set());

      await Promise.all([fetchMyCompany(), fetchComparisonCompanies()]);
      setError("");
    } catch (err) {
      console.error(err);
      setMyCompany(null);
      setComparisonCompanies([]);
      setSelectedComparisonCompanies(new Set());
      setError(
        "전체 초기화 중 일부 API 실패가 있어 화면 기준으로 초기화했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openMyCompanyModal = () => {
    setMyCompanySearchKeyword("");
    setIsMyCompanyModalOpen(true);
  };

  const openComparisonModal = () => {
    setSelectedComparisonCompanies(new Set());
    setComparisonSearchKeyword("");
    setComparisonModalPage(1);
    setIsComparisonModalOpen(true);
  };

  const filteredMyCompanyCandidates = useMemo(() => {
    const keyword = myCompanySearchKeyword.trim().toLowerCase();
    if (!keyword) return allCompanies.slice(0, 20);

    return allCompanies.filter((company) =>
      `${getCompanyName(company)} ${getCompanyCategory(company)}`
        .toLowerCase()
        .includes(keyword),
    );
  }, [allCompanies, myCompanySearchKeyword]);

  const filteredComparisonCandidates = useMemo(() => {
    const keyword = comparisonSearchKeyword.trim().toLowerCase();

    return allCompanies.filter((company) => {
      if (myCompany?.id === company.id) return false;

      if (!keyword) return true;

      return `${getCompanyName(company)} ${getCompanyCategory(company)}`
        .toLowerCase()
        .includes(keyword);
    });
  }, [allCompanies, comparisonSearchKeyword, myCompany]);

  const pagedComparisonCandidates = useMemo(() => {
    const start = (comparisonModalPage - 1) * MODAL_PAGE_SIZE;
    return filteredComparisonCandidates.slice(start, start + MODAL_PAGE_SIZE);
  }, [filteredComparisonCandidates, comparisonModalPage]);

  const comparisonTotalPages = Math.max(
    1,
    Math.ceil(filteredComparisonCandidates.length / MODAL_PAGE_SIZE),
  );

  useEffect(() => {
    if (comparisonModalPage > comparisonTotalPages) {
      setComparisonModalPage(comparisonTotalPages);
    }
  }, [comparisonModalPage, comparisonTotalPages]);

  const toggleComparisonCandidate = (companyId) => {
    const isAlreadyInComparison = comparisonCompanies.some(
      (c) => c.id === companyId,
    );
    if (isAlreadyInComparison) return;

    setSelectedComparisonCompanies((prev) => {
      const next = new Set(prev);

      if (next.has(companyId)) {
        next.delete(companyId);
        return next;
      }

      const currentTotal = comparisonCompanies.length + next.size;
      if (currentTotal >= MAX_COMPARISON) {
        setError(
          `비교 기업은 최대 ${MAX_COMPARISON}개까지 선택할 수 있습니다.`,
        );
        return prev;
      }

      next.add(companyId);
      setError("");
      return next;
    });
  };

  const comparisonSlots = Array.from(
    { length: MAX_COMPARISON },
    (_, index) => comparisonCompanies[index] || null,
  );

  return (
    <div className="select-page">
      {error && (
        <div className="error-banner">
          <p>{error}</p>
          <button type="button" onClick={() => setError("")}>
            닫기
          </button>
        </div>
      )}

      <section className="compare-section">
        <div className="section-title-row">
          <h2 className="section-title">나의 기업을 선택해 주세요!</h2>
          {myCompany && (
            <button
              type="button"
              className="primary-pill-btn"
              onClick={resetAllSelections}
              disabled={isLoading}
            >
              전체 초기화
            </button>
          )}
        </div>

        <div className="my-company-box">
          {myCompany ? (
            <div className="my-company-content">
              <button
                type="button"
                className="my-company-cancel-link"
                onClick={clearMyCompany}
                disabled={isLoading}
              >
                선택 취소
              </button>
              <img
                src={getCompanyLogo(myCompany)}
                alt={getCompanyName(myCompany)}
                className="company-avatar-large"
              />
              <p className="company-name">{getCompanyName(myCompany)}</p>
              <p className="company-category">
                {getCompanyCategory(myCompany)}
              </p>
            </div>
          ) : (
            <div className="my-company-empty">
              <button
                type="button"
                className="icon-circle-btn"
                onClick={openMyCompanyModal}
                disabled={isLoading}
              >
                +
              </button>
              <p className="empty-label">기업 추가</p>
            </div>
          )}
        </div>
      </section>

      {myCompany && (
        <section className="compare-section">
          <div className="section-title-row">
            <h2 className="section-title">
              어떤 기업이 궁금하세요? (최대 5개)
            </h2>
            <button
              type="button"
              className="primary-pill-btn"
              onClick={openComparisonModal}
              disabled={
                isLoading || comparisonCompanies.length >= MAX_COMPARISON
              }
            >
              기업 추가하기
            </button>
          </div>

          <div className="comparison-cards-area">
            {comparisonCompanies.length === 0 ? (
              <div className="comparison-empty-state">
                아직 추가한 기업이 없어요,
                <br />
                버튼을 눌러 기업을 추가해보세요!
              </div>
            ) : (
              <div className="comparison-grid">
                {comparisonSlots.map((company, idx) =>
                  company ? (
                    <article key={company.id} className="comparison-card">
                      <button
                        type="button"
                        className="card-remove-btn"
                        onClick={() => removeComparisonCompany(company.id)}
                        disabled={isLoading}
                        aria-label={`${getCompanyName(company)} 삭제`}
                      >
                        ×
                      </button>
                      <img
                        src={getCompanyLogo(company)}
                        alt={getCompanyName(company)}
                        className="company-avatar"
                      />
                      <p className="company-name">{getCompanyName(company)}</p>
                      <p className="company-category">
                        {getCompanyCategory(company)}
                      </p>
                    </article>
                  ) : (
                    <article
                      key={`empty-${idx}`}
                      className="comparison-card comparison-card--empty"
                    />
                  ),
                )}
              </div>
            )}
          </div>
        </section>
      )}

      <button
        type="button"
        className="compare-submit-btn"
        disabled={!myCompany || comparisonCompanies.length === 0 || isLoading}
        onClick={() => navigate("/compare")}
      >
        기업 비교하기
      </button>

      {isMyCompanyModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsMyCompanyModalOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">나의 기업 선택하기</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsMyCompanyModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-search-row">
                <input
                  className="modal-search-input"
                  type="text"
                  placeholder="기업 검색"
                  value={myCompanySearchKeyword}
                  onChange={(e) => setMyCompanySearchKeyword(e.target.value)}
                />
                {myCompanySearchKeyword && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setMyCompanySearchKeyword("")}
                  >
                    ×
                  </button>
                )}
              </div>

              <p className="modal-section-title">최근 선택한 기업</p>
              <div className="modal-list">
                {filteredMyCompanyCandidates.slice(0, 6).map((company) => (
                  <div key={company.id} className="modal-row">
                    <div className="modal-row-left">
                      <img
                        src={getCompanyLogo(company)}
                        alt={getCompanyName(company)}
                        className="modal-logo"
                      />
                      <div className="modal-meta">
                        <p className="modal-row-title">
                          {getCompanyName(company)}
                        </p>
                        <p className="modal-row-sub">
                          {getCompanyCategory(company)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`modal-row-action ${myCompany?.id === company.id ? "is-completed" : ""}`}
                      onClick={() => addMyCompany(company)}
                      disabled={isLoading || myCompany?.id === company.id}
                    >
                      {myCompany?.id === company.id ? "선택 완료" : "선택하기"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isComparisonModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsComparisonModalOpen(false)}
        >
          <div
            className="modal-content modal-content-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3 className="modal-title">비교 기업 선택하기</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsComparisonModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-search-row">
                <input
                  className="modal-search-input"
                  type="text"
                  placeholder="기업 검색"
                  value={comparisonSearchKeyword}
                  onChange={(e) => {
                    setComparisonSearchKeyword(e.target.value);
                    setComparisonModalPage(1);
                  }}
                />
                {comparisonSearchKeyword && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => {
                      setComparisonSearchKeyword("");
                      setComparisonModalPage(1);
                    }}
                  >
                    ×
                  </button>
                )}
              </div>

              <p className="modal-section-title">
                선택한 기업 (
                {comparisonCompanies.length + selectedComparisonCompanies.size})
              </p>
              <div className="modal-list selected-list">
                {comparisonCompanies.length === 0 &&
                  selectedComparisonCompanies.size === 0 && (
                    <p className="modal-empty">아직 선택한 기업이 없습니다.</p>
                  )}

                {comparisonCompanies.map((company) => (
                  <div key={`selected-${company.id}`} className="modal-row">
                    <div className="modal-row-left">
                      <img
                        src={getCompanyLogo(company)}
                        alt={getCompanyName(company)}
                        className="modal-logo"
                      />
                      <div className="modal-meta">
                        <p className="modal-row-title">
                          {getCompanyName(company)}
                        </p>
                        <p className="modal-row-sub">
                          {getCompanyCategory(company)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="modal-row-action is-completed"
                      disabled
                    >
                      선택 완료
                    </button>
                  </div>
                ))}

                {Array.from(selectedComparisonCompanies).map((companyId) => {
                  const company = allCompanies.find(
                    (item) => item.id === companyId,
                  );
                  if (!company) return null;

                  return (
                    <div key={`pending-${companyId}`} className="modal-row">
                      <div className="modal-row-left">
                        <img
                          src={getCompanyLogo(company)}
                          alt={getCompanyName(company)}
                          className="modal-logo"
                        />
                        <div className="modal-meta">
                          <p className="modal-row-title">
                            {getCompanyName(company)}
                          </p>
                          <p className="modal-row-sub">
                            {getCompanyCategory(company)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="modal-row-action is-selected"
                        onClick={() => toggleComparisonCandidate(companyId)}
                      >
                        선택 해제
                      </button>
                    </div>
                  );
                })}
              </div>

              <p className="modal-section-title">
                검색 결과 ({filteredComparisonCandidates.length})
              </p>
              <div className="modal-list">
                {pagedComparisonCandidates.length === 0 ? (
                  <p className="modal-empty">검색 결과가 없습니다.</p>
                ) : (
                  pagedComparisonCandidates.map((company) => {
                    const isAlreadySelected = comparisonCompanies.some(
                      (c) => c.id === company.id,
                    );
                    const isSelectedInModal = selectedComparisonCompanies.has(
                      company.id,
                    );

                    return (
                      <div key={company.id} className="modal-row">
                        <div className="modal-row-left">
                          <img
                            src={getCompanyLogo(company)}
                            alt={getCompanyName(company)}
                            className="modal-logo"
                          />
                          <div className="modal-meta">
                            <p className="modal-row-title">
                              {getCompanyName(company)}
                            </p>
                            <p className="modal-row-sub">
                              {getCompanyCategory(company)}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`modal-row-action ${isAlreadySelected ? "is-completed" : isSelectedInModal ? "is-selected" : ""}`}
                          onClick={() => toggleComparisonCandidate(company.id)}
                          disabled={isAlreadySelected}
                        >
                          {isAlreadySelected
                            ? "선택 완료"
                            : isSelectedInModal
                              ? "선택 해제"
                              : "선택하기"}
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <p className="modal-hint">
                비교 기업은 최대 5개까지 선택할 수 있습니다.
              </p>

              <div className="modal-footer">
                <div className="pagination">
                  <button
                    type="button"
                    className="page-btn"
                    onClick={() =>
                      setComparisonModalPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={comparisonModalPage === 1}
                  >
                    {"<"}
                  </button>
                  {Array.from(
                    { length: comparisonTotalPages },
                    (_, idx) => idx + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`page-btn ${page === comparisonModalPage ? "is-active" : ""}`}
                      onClick={() => setComparisonModalPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="page-btn"
                    onClick={() =>
                      setComparisonModalPage((prev) =>
                        Math.min(comparisonTotalPages, prev + 1),
                      )
                    }
                    disabled={comparisonModalPage === comparisonTotalPages}
                  >
                    {">"}
                  </button>
                </div>

                <button
                  type="button"
                  className="confirm-add-btn"
                  onClick={() =>
                    addComparisonCompanies(
                      Array.from(selectedComparisonCompanies),
                    )
                  }
                  disabled={selectedComparisonCompanies.size === 0 || isLoading}
                >
                  기업 추가하기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
