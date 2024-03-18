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

const getPersonelById = async (id, isAll = null) => {
  try {
    const url = `${API_BASE_URL}/personel/${id}${isAll !== null ? `?isAll=${isAll}` : ''}`;
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

const getPersonelCardLastMonth = async () => {
  try {
    const url = `${API_BASE_URL}/personel/new-personel`;
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
    try {
      const formData = new FormData();

      if (file) {
        formData.append("file", file, file.name);
      }
      Object.keys(personelDTO).forEach((key) => {
        formData.append(key, personelDTO[key]);
      });

      const url = `${API_BASE_URL}/personel/admin/add`;
      const result = await axios.post(url, formData, {
        headers: getHeaders(true),
      });
      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
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


async function updateActivity(activityId, activityDTO, file) {
  try {
    const formData = new FormData();


    if (file instanceof Blob || file instanceof File) {
      formData.append("file", file, file.name);
    } else {
      console.error("Invalid file Type: ", typeof file)
      return;
    }

    if (file) {
      formData.append("file", file, file.name);
    }

    Object.keys(activityDTO).forEach((key) => {
      formData.append(key, activityDTO[key]);
    });

    const url = `${API_BASE_URL}/activity/updateNew/${activityId}`;

    const result = await axios.put(url, formData, {
      headers: getHeaders(true),
    });
    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

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

async function deleteFile(fileId) {
  try {
    const url = `${API_BASE_URL}/file/delete/${fileId}`;
    return await axios.delete(url, { headers: getHeaders() });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteProject(projectId) {
  try {
    const url = `${API_BASE_URL}/project/delete/${projectId}`;
    return await axios.delete(url, { headers: getHeaders() });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteExperience(experienceId) {
  try {
    const url = `${API_BASE_URL}/experience/delete/${experienceId}`;
    return await axios.delete(url, { headers: getHeaders() });
  } catch (error) {
    console.error(error);
    throw error;
  }
}


async function deleteEducation(educationId) {
  try {
    const url = `${API_BASE_URL}/education/delete/${educationId}`;
    return await axios.delete(url, { headers: getHeaders() });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteActivity(activityId) {
  try {
    const url = `${API_BASE_URL}/activity/delete/${activityId}`;
    return await axios.delete(url, { headers: getHeaders() });
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
  getPersonelCardLastMonth,
  getResourcePhoto,
  getFileByPersonelId,
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
  updateActivity,
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
