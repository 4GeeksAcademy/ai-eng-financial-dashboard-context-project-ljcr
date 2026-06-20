export interface FacetsResponse {
	/**
	 * Tipos de operación disponibles para filtrar métricas.
	 * Valores válidos: "income" (ingreso) o "outcome" (egreso).
	 */
	operation_types: Array<"income" | "outcome">;

	/**
	 * Tipos de negocio disponibles para segmentar la data.
	 * Valores válidos: "B2B" o "B2C".
	 */
	business_types: Array<"B2B" | "B2C">;

	/**
	 * Categorías operacionales presentes en el dataset.
	 * Valores válidos: "suppliers", "sales", "operational", "administrative" u "others".
	 */
	categories: Array<
		"suppliers" | "sales" | "operational" | "administrative" | "others"
	>;

	/**
	 * Fecha más antigua disponible en el dataset.
	 * Formato: ISO 8601 de fecha corta `YYYY-MM-DD`.
	 */
	min_date: string;

	/**
	 * Fecha más reciente disponible en el dataset.
	 * Formato: ISO 8601 de fecha corta `YYYY-MM-DD`.
	 */
	max_date: string;
}

export interface AlertEntry {
	/**
	 * Periodo agrupado sobre el que se detecta la anomalía.
	 * Formatos válidos según `group_by`: `YYYY-MM` (month), `YYYY-Www` (week) o `YYYY-MM-DD` (day).
	 */
	period: string;

	/**
	 * Total de egresos (`outcome`) observado en el periodo.
	 * Unidad: moneda base del sistema.
	 */
	outcome_total: number;

	/**
	 * Media de egresos de la ventana histórica usada como línea base.
	 * En el backend actual corresponde a la media móvil de los periodos previos disponibles.
	 */
	baseline_average: number;

	/**
	 * Incremento relativo respecto a la línea base.
	 * Se expresa como ratio decimal (ej.: `0.3` = 30% de incremento).
	 */
	increase_ratio: number;
}

export interface AlertsResponse {
	/**
	 * Elemento de alerta cuando la API se consume como lista plana.
	 * `GET /api/metrics/alerts` devuelve actualmente una lista directa.
	 */
	[index: number]: AlertEntry;

	/**
	 * Longitud de la colección cuando la respuesta se trata como array.
	 */
	length?: number;

	/**
	 * Lista de alertas en escenarios donde la respuesta venga envuelta en una propiedad.
	 * Esta forma es compatible para consumidores que usen envelope.
	 */
	alerts?: AlertEntry[];
}

export interface CategoryEntry {
	/**
	 * Nombre de la categoría operacional.
	 * Valores válidos: "suppliers", "sales", "operational", "administrative" u "others".
	 */
	category: "suppliers" | "sales" | "operational" | "administrative" | "others";

	/**
	 * Tipo de operación al que pertenece la categoría agregada.
	 * Valores válidos: "income" o "outcome".
	 */
	operation_type: "income" | "outcome";

	/**
	 * Monto total agregado de la categoría en el rango consultado.
	 * Unidad: moneda base del sistema.
	 */
	total_amount: number;

	/**
	 * Participación de la categoría sobre el total del grupo consultado.
	 * Se expresa como ratio decimal entre `0` y `1` cuando está disponible.
	 */
	group_share_ratio?: number;
}

export interface TopCategoriesResponse {
	/**
	 * Elemento de categoría cuando la API se consume como lista plana.
	 * `GET /api/metrics/categories/top` devuelve actualmente una lista directa.
	 */
	[index: number]: CategoryEntry;

	/**
	 * Longitud de la colección cuando la respuesta se trata como array.
	 */
	length?: number;

	/**
	 * Lista de categorías en escenarios donde la respuesta venga envuelta en una propiedad.
	 */
	categories?: CategoryEntry[];
}
