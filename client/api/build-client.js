import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server
    console.log(req.headers);
    return axios.create({
      // Dev Local Environment ONLY "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      baseURL: "http://www.rocketpaper.com.br",
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: "/",
    });
  }
};

export default buildClient;
