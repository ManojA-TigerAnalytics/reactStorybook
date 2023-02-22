import client from "../../axios";

const RecommenderService = {
  getPromoChannel() {
    return client.get("/offer_configuration/promochannel/");
  },
  getSegment() {
    return client.get("/offer_configuration/all/segments/");
  },
  getStatus() {
    return client.get("/offer_configuration/status/list/");
  },
  getFilteredRecommendation() {
    return client.get("/offer_configuration/list?page=1");
  },
};

export default RecommenderService;
