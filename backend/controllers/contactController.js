import ContactReport from "../models/ContactReport.js";

export const submitContactReport = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    const contactReport = await ContactReport.create({
      name,
      email,
      subject,
      message,
    });

    return res.status(201).json({
      message: "Contact report submitted successfully.",
      contactReport,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to submit contact report.",
      error: error.message,
    });
  }
};

export const getContactReports = async (req, res) => {
  try {
    const contactReports = await ContactReport.find().sort({
      createdAt: -1,
    });

    return res.status(200).json(contactReports);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get contact reports.",
      error: error.message,
    });
  }
};

export const resolveContactReport = async (req, res) => {
  try {
    const { id } = req.params;

    const contactReport = await ContactReport.findByIdAndUpdate(
      id,
      { status: "resolved" },
      { new: true }
    );

    if (!contactReport) {
      return res.status(404).json({
        message: "Contact report not found.",
      });
    }

    return res.status(200).json({
      message: "Contact report marked as resolved.",
      contactReport,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update contact report.",
      error: error.message,
    });
  }
};

export const deleteContactReport = async (req, res) => {
  try {
    const { id } = req.params;

    const contactReport = await ContactReport.findByIdAndDelete(id);

    if (!contactReport) {
      return res.status(404).json({
        message: "Contact report not found.",
      });
    }

    return res.status(200).json({
      message: "Contact report deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete contact report.",
      error: error.message,
    });
  }
};