exports.health = async (req, res) => {
  try {
    res.status(200).json({
      status: 'ok',
      message: 'Barbershop API is running',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
