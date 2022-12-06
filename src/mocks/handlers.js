import { rest } from "msw";
import modelsByCancer from "./data/models_by_cancer.json";
import modelsByType from "./data/models_by_type.json";
import searchTerms from "./data/search_terms.json";
import facetSections from "./data/facet_sections.json";

import datasetAvailableFacet from "./data/dataset_available_facet.json";
import dataSourceFacet from "./data/data_source_facet.json";
import modelTypeFacet from "./data/model_type_facet.json";
import projectNameFacet from "./data/project_name_facet.json";
import breastCancerBiomarkersFacet from "./data/breast_cancer_biomarkers_facet.json";
import patientAgeFacet from "./data/patient_age_facet.json";
import cancerSystemFacet from "./data/cancer_system_facet.json";
import tumourTypeFacet from "./data/tumour_type_facet.json";
import patientSexFacet from "./data/patient_sex_facet.json";
import patientTreatmentFacet from "./data/patient_treatment_facet.json";

import searchIndex from "./data/search_index.json";

export const handlers = [
  rest.post("/api/login", (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem("is-authenticated", "true");
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),
  rest.get("/api/models_by_cancer", (req, res, ctx) => {
    try {
      const results = modelsByCancer;
      return res(ctx.status(200), ctx.json(results));
    } catch (e) {
      return res(ctx.status(404));
    }
  }),
  rest.get("/api/models_by_type", (req, res, ctx) => {
    try {
      const results = modelsByType;
      return res(ctx.status(200), ctx.json(results));
    } catch (e) {
      return res(ctx.status(404));
    }
  }),
  rest.get("/api/search_facet_options", (req, res, ctx) => {
    try {
      let results = searchTerms;

      if (req.url.search.includes("neq.search")) results = facetSections;

      if (req.url.search.includes("eq.dataset_available"))
        results = datasetAvailableFacet;
      if (req.url.search.includes("eq.data_source")) results = dataSourceFacet;
      if (req.url.search.includes("eq.model_type")) results = modelTypeFacet;
      if (req.url.search.includes("eq.project_name"))
        results = projectNameFacet;
      if (req.url.search.includes("eq.breast_cancer_biomarkers"))
        results = breastCancerBiomarkersFacet;
      if (req.url.search.includes("eq.patient_age")) results = patientAgeFacet;
      if (req.url.search.includes("eq.cancer_system"))
        results = cancerSystemFacet;
      if (req.url.search.includes("eq.tumour_type")) results = tumourTypeFacet;
      if (req.url.search.includes("eq.patient_sex")) results = patientSexFacet;
      if (req.url.search.includes("eq.patient_treatment"))
        results = patientTreatmentFacet;

      return res(ctx.status(200), ctx.json(results));
    } catch (e) {
      return res(ctx.status(404));
    }
  }),
  rest.get("/api/search_index", (req, res, ctx) => {
    try {
      const results = searchIndex;
      return res(ctx.status(200), ctx.json(results));
    } catch (e) {
      return res(ctx.status(404));
    }
  }),
];
