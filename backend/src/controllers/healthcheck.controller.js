const healthcheck = async (req, res) => {
    try {
      const data = { status: "ok", message: "Server is healthy" };
      res.status(200).json(data);
    } catch (error) {
      console.error("healthcheck not found", error);
      res.status(500).json({ error: "Healthcheck failed" });
    }
  };
  export {healthcheck}