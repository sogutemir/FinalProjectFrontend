import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "http://localhost:8080";

const getHeaders = (isMultipart = false) => {
  const token = Cookies.get("user_token");
  if (isMultipart) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

//#region GetMethods
const getAllPersonel = async () => {
  try {
    const url = `${API_BASE_URL}/personel/all`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting all personel:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getPersonelById = async (id) => {
  try {
    const url = `${API_BASE_URL}/personel/${id}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting personel:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getProjectByPersonelId = async (id) => {
  try {
    const url = `${API_BASE_URL}/project/getByPersonelId/${id}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting project:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getResourcePhoto = async (id) => {
  try {
    const url = `${API_BASE_URL}/resourceFile/image/${id}`;
    return await axios.get(url, {
      headers: getHeaders(),
      responseType: "blob",
    });
  } catch (error) {
    console.error("Error getting photo:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getFileByPersonelId = async (personelId) => {
  try {
    const url = `${API_BASE_URL}/file/getByPersonelId/${personelId}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting files by personel ID:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getProjectsByPersonelId = async (personelId) => {
  try {
    const url = `${API_BASE_URL}/project/${personelId}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting projects by personel ID:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getActivityByPersonelId = async (personelId) => {
  try {
    const url = `${API_BASE_URL}/activity/getByPersonelId/${personelId}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting activities by personel ID:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getEducationByPersonelId = async (personelId) => {
  try {
    const url = `${API_BASE_URL}/education/getByPersonelId/${personelId}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting education by personel ID:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const getExperienceByPersonelId = async (personelId) => {
  try {
    const url = `${API_BASE_URL}/experience/getByPersonelId/${personelId}`;
    return await axios.get(url, { headers: getHeaders() });
  } catch (error) {
    console.error("Error getting education by personel ID:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};
//#endregion

//#region  AddMethods

const addPersonel = async (personelDTO, file) => {
  let formData = new FormData();
  formData.append("file", file);
  formData.append("personelDTO", JSON.stringify(personelDTO));

  let config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios.post("/admin/add", formData, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const addFile = async (file, section, personelId) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("section", section);
    formData.append("personelId", personelId);

    const url = `${API_BASE_URL}/file/add`;
    return await axios.post(url, formData, { headers: getHeaders(true) });
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
  }
};

const addActivity = async (
  file,
  activityName,
  description,
  eventType,
  link,
  personelId
) => {
  const url = `${API_BASE_URL}/activity/add`;
  const formData = new FormData();

  formData.append("file", file);
  formData.append("activityName", activityName);
  formData.append("description", description);
  formData.append("eventType", eventType);
  formData.append("link", link);
  formData.append("personelId", personelId);

  try {
    const response = await axios.post(url, formData, {
      headers: getHeaders(true),
    });

    if (response.status === 200) {
      console.log("File uploaded successfully");
      return response.data;
    } else {
      console.error("Failed to upload file");
      return null;
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin");
    return null;
  }
};

const addProject = async (projectData) => {
  const token = Cookies.get("user_token");
  const formData = new FormData();

  formData.append("projectName", projectData.projectName);
  formData.append("teamName", projectData.teamName);
  formData.append("projectTask", projectData.projectTask);
  formData.append("projectStartDate", projectData.projectStartDate);
  formData.append("projectFinishDate", projectData.projectFinishDate);
  formData.append("projectStatus", projectData.projectStatus);
  formData.append("personelId", projectData.personelId);

  try {
    const response = await axios.post(`${API_BASE_URL}/project/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error adding project:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const addExperience = async (experienceData) => {
  const token = Cookies.get("user_token");
  const formData = new FormData();

  formData.append("institutionName", experienceData.institutionName);
  formData.append("workType", experienceData.workType);
  formData.append("jobStartDate", experienceData.jobStartDate);
  formData.append("jobEndDate", experienceData.jobEndDate);
  formData.append("workPosition", experienceData.workPosition);
  formData.append("workDescription", experienceData.workDescription);
  formData.append("personelId", experienceData.personelId);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/experience/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding experience:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

const addEducation = async (educationData) => {
  const token = Cookies.get("user_token");
  const formData = new FormData();

  formData.append("educationType", educationData.educationType);
  formData.append("universityName", educationData.universityName);
  formData.append("educationStartDate", educationData.educationStartDate);
  formData.append("educationEndDate", educationData.educationEndDate);
  formData.append("additionalInformation", educationData.additionalInformation);
  formData.append("personelId", educationData.personelId);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/education/add`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding education:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

//#endregion

//#region  UpdateMethods
async function updatePersonel(personelId, personelDTO, file) {
  try {
    const formData = new FormData();

    if (file) {
      formData.append("file", file, file.name);
    }

    Object.keys(personelDTO).forEach((key) => {
      formData.append(key, personelDTO[key]);
    });

    const url = `${API_BASE_URL}/personel/update/${personelId}`;

    const result = await axios.put(url, formData, {
      headers: getHeaders(true),
    });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// async function updatePersonel(personelId, personel, file) {
//   try {
//     const formData = new FormData();
//     if (file) {
//       formData.append("file", file, file.name);
//     }

//     formData.append("name", personel.name);
//     formData.append("surname", personel.surname);
//     formData.append("identityNumber", personel.identityNumber);
//     formData.append("academicTitle", personel.academicTitle);
//     formData.append("email", personel.email);
//     formData.append("dateOfBirth", personel.dateOfBirth);
//     formData.append("bloodType", personel.bloodType);
//     formData.append("phone", personel.phone);
//     formData.append("vehiclePlate", personel.vehiclePlate);
//     formData.append("emergencyContact", personel.emergencyContact);
//     formData.append("emergencyContactPhone", personel.emergencyContactPhone);
//     formData.append("residenceAddress", personel.residenceAddress);
//     formData.append("employmentStartDate", personel.employmentStartDate);
//     formData.append("registrationNumber", personel.registrationNumber);
//     formData.append("cadre", personel.cadre);
//     formData.append("title", personel.title);
//     formData.append("department", personel.department);
//     formData.append("projectInProgress", personel.projectInProgress);
//     formData.append("task", personel.task);
//     formData.append("teamName", personel.teamName);
//     formData.append("personnelType", personel.personnelType);
//     formData.append("workingType", personel.workingType);
//     formData.append("workStatus", personel.workStatus);
//     formData.append("inServiceUsage", personel.inServiceUsage);
//     formData.append("internalNumber", personel.internalNumber);
//     formData.append("roomNumber", personel.roomNumber);
//     formData.append("isMale", personel.isMale);

//     const url = `${API_BASE_URL}/personel/update/${personelId}`;

//     const result = await axios.put(url, formData, {
//       headers: getHeaders(true),
//     });
//     return result.data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

//#endregion

//#region  DeleteMethods

async function deletePersonel(personelId) {
  try {
    const url = `${API_BASE_URL}/personel/admin/delete/${personelId}`;
    const result = await axios.delete(url, { headers: getHeaders });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteFile(personelId) {
  try {
    const url = `${API_BASE_URL}/file/delete/${personelId}`;
    const result = await axios.delete(url, { headers: getHeaders });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteProject(personelId) {
  try {
    const url = `${API_BASE_URL}/project/delete/${personelId}`;
    const result = await axios.delete(url, { headers: getHeaders });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteExperience(personelId) {
  try {
    const url = `${API_BASE_URL}/experience/delete/${personelId}`;
    const result = await axios.delete(url, { headers: getHeaders });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteEducation(personelId) {
  try {
    const url = `${API_BASE_URL}/education/delete/${personelId}`;
    const result = await axios.delete(url, { headers: getHeaders });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteActivity(personelId) {
  try {
    const url = `${API_BASE_URL}/activity/delete/${personelId}`;
    const result = await axios.delete(url, { headers: getHeaders });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//#endregion

export {
  ///
  ///get methods
  ///
  getAllPersonel,
  getPersonelById,
  getResourcePhoto,
  getFileByPersonelId,
  getProjectsByPersonelId,
  getActivityByPersonelId,
  getEducationByPersonelId,
  getProjectByPersonelId,
  getExperienceByPersonelId,

  ///
  ///add methods
  ///
  addFile,
  addActivity,
  addProject,
  addExperience,
  addEducation,
  addPersonel,

  ///
  ///Update Methods
  ///
  updatePersonel,

  ///
  ///Delete Methods
  ///
  deleteActivity,
  deleteEducation,
  deleteExperience,
  deleteFile,
  deletePersonel,
  deleteProject,
};
