import FilterOption from "../models/FilterOption.js";

const groupFiltersByType = (filters) => {
  return {
    cookTime: filters.filter((filter) => filter.type === "cookTime"),
    dietary: filters.filter((filter) => filter.type === "dietary"),
    allergy: filters.filter((filter) => filter.type === "allergy"),
  };
};

export const getActiveFilters = async (req, res) => {
  try {
    const filters = await FilterOption.find({ isActive: true }).sort({
      type: 1,
      name: 1,
    });

    return res.status(200).json(groupFiltersByType(filters));
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get active filters.",
      error: error.message,
    });
  }
};

export const getAllFilters = async (req, res) => {
  try {
    const filters = await FilterOption.find().sort({
      type: 1,
      name: 1,
    });

    return res.status(200).json(groupFiltersByType(filters));
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get filters.",
      error: error.message,
    });
  }
};

export const createFilterOption = async (req, res) => {
  try {
    const { name, value, type, isActive } = req.body;

    if (!name || !value || !type) {
      return res.status(400).json({
        message: "Name, value, and type are required.",
      });
    }

    const validTypes = ["cookTime", "dietary", "allergy"];

    if (!validTypes.includes(type)) {
      return res.status(400).json({
        message: "Invalid filter type.",
      });
    }

    const existingFilter = await FilterOption.findOne({
      value,
      type,
    });

    if (existingFilter) {
      return res.status(400).json({
        message: "This filter option already exists.",
      });
    }

    const filterOption = await FilterOption.create({
      name,
      value,
      type,
      isActive: isActive ?? true,
    });

    return res.status(201).json({
      message: "Filter option created successfully.",
      filterOption,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create filter option.",
      error: error.message,
    });
  }
};

export const updateFilterOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, value, type, isActive } = req.body;

    const validTypes = ["cookTime", "dietary", "allergy"];

    if (type && !validTypes.includes(type)) {
      return res.status(400).json({
        message: "Invalid filter type.",
      });
    }

    const updatedFilter = await FilterOption.findByIdAndUpdate(
      id,
      {
        ...(name !== undefined && { name }),
        ...(value !== undefined && { value }),
        ...(type !== undefined && { type }),
        ...(isActive !== undefined && { isActive }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedFilter) {
      return res.status(404).json({
        message: "Filter option not found.",
      });
    }

    return res.status(200).json({
      message: "Filter option updated successfully.",
      filterOption: updatedFilter,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update filter option.",
      error: error.message,
    });
  }
};

export const deleteFilterOption = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFilter = await FilterOption.findByIdAndDelete(id);

    if (!deletedFilter) {
      return res.status(404).json({
        message: "Filter option not found.",
      });
    }

    return res.status(200).json({
      message: "Filter option deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete filter option.",
      error: error.message,
    });
  }
};