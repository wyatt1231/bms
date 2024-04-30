import { PostFetch } from "../../Hooks/UseFetch";
import IServerResponse from "../Interface/IServerResponse";
import { DashboardFilterInterface } from "../Models/DashboardModel";

const API_DEFAULT_ROUTE = `api/dashboard/`;

const overallPopulation = async (
  filter: Array<string>
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "overallPopulation",
    filter
  );
  return response;
};

const ageGroupStats = async (
  filters: DashboardFilterInterface
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "ageGroupStats",
    filters
  );
  return response;
};

const genderStats = async (
  filters: DashboardFilterInterface
): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "genderStats", filters);
  return response;
};

const lifeStageStats = async (
  filters: DashboardFilterInterface
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "lifeStageStats",
    filters
  );
  return response;
};

const statsNews = async (): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "statsNews", null);
  return response;
};

const totalPopulation = async (
  filters: DashboardFilterInterface
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "total_population",
    filters
  );
  return response;
};

const totalDeath = async (
  filters: DashboardFilterInterface
): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "total_death", filters);
  return response;
};

const totalPwd = async (
  filters: DashboardFilterInterface
): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "total_pwd", filters);
  return response;
};

const totalSc = async (
  filters: DashboardFilterInterface
): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "total_sc", filters);
  return response;
};

const statsComplaint = async (): Promise<IServerResponse> => {
  const response = await PostFetch(API_DEFAULT_ROUTE + "statsComplaint", null);
  return response;
};

const StatsPasilidadKuryente = async (
  filters: DashboardFilterInterface
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "StatsPasilidadKuryente",
    filters
  );
  return response;
};
const StatsBiktikmaPangabuso = async (
  filters: DashboardFilterInterface
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "StatsBiktikmaPangabuso",
    filters
  );
  return response;
};
const StatsKahimtangKomunidad = async (
  filters: DashboardFilterInterface
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "StatsKahimtangKomunidad",
    filters
  );
  return response;
};
const StatsMatangBasura = async (
  filters: DashboardFilterInterface
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "StatsMatangBasura",
    filters
  );
  return response;
};
const StatsMatangKasilyas = async (
  filters: DashboardFilterInterface
): Promise<IServerResponse> => {
  const response = await PostFetch(
    API_DEFAULT_ROUTE + "StatsMatangKasilyas",
    filters
  );
  return response;
};

export default {
  overallPopulation,
  ageGroupStats,
  genderStats,
  lifeStageStats,
  statsComplaint,
  statsNews,
  totalPopulation,
  totalDeath,
  totalPwd,
  totalSc,
  StatsPasilidadKuryente,
  StatsBiktikmaPangabuso,
  StatsKahimtangKomunidad,
  StatsMatangBasura,
  StatsMatangKasilyas,
};
