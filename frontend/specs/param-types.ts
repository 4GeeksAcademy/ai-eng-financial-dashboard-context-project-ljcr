/**
 * Filtro por rango de fechas para endpoints de métricas.
 */
export interface DateRangeFilter {
	/**
	 * Fecha inicial del rango (inclusive).
	 * Formato requerido: YYYY-MM-DD.
	 */
	start_date?: string;

	/**
	 * Fecha final del rango (inclusive).
	 * Formato requerido: YYYY-MM-DD.
	 */
	end_date?: string;
}

/**
 * Parámetros de consulta para GET /api/metrics/alerts.
 */
export interface AlertsParams extends DateRangeFilter {
	/**
	 * Umbral de detección de anomalías como ratio decimal.
	 * Rango esperado: 0.01 a 1.0. Valor por defecto del backend: 0.3.
	 */
	threshold?: number;
}

/**
 * Parámetros de consulta para GET /api/metrics/categories/top.
 */
export interface TopCategoriesParams extends DateRangeFilter {
	/**
	 * Tipo de operación requerido para esta consulta.
	 * Valor permitido: 'income'.
	 */
	operation_type: "income";

	/**
	 * Cantidad máxima de categorías devueltas.
	 * Valor requerido para este caso: 5.
	 */
	limit: 5;
}
