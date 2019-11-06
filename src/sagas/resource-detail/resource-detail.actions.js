export const getResourceDetailByIdRequest = ({resourceId}) => {
	return { type: "GET_RESOURCE_DETAIL_BY_ID_REQUEST", resourceId };
}

export const getResourceDetailProvenanceByIdRequest = ({resourceId}) => {
	return { type: "GET_RESOURCE_DETAIL_PROVENANCE_BY_ID_REQUEST", resourceId };
}

export const getProvenanceByFormat = ({format}) => {
	return { type: "GET_RESOURCE_DETAIL_PROVENANCE_BY_FORMAT", format };
}

export const getResourceDetailHistoryByIdRequest = ({resourceId}) => {
	return { type: "GET_RESOURCE_DETAIL_HISTORY_BY_ID_REQUEST", resourceId };
}

export const cleanupResourceDetail = () => {
	return { type: "CLEAN_UP_RESOURCE_DETAIL" };

}
export const getProvN = () => {
	return { type: "GET_RESOURCE_PROVN" };
}
