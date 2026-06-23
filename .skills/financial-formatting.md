---
name: financial-formatting
description: Skill para estandarizar el formato monetario y porcentual en dashboards financieros React usando Intl.NumberFormat, con señales visuales semánticas para ganancias/pérdidas.
version: 1.0.0
owner: project
---

# Financial Formatting Skill

## Objetivo
Garantizar que todos los valores monetarios y porcentajes en el dashboard se formateen de forma consistente usando `Intl.NumberFormat`.

## Inputs
- Componentes de React que renderizan números.
- Tablas de transacciones.
- Tarjetas de balance.

## Outputs
- Código modificado donde los números crudos se pasan por una función utilitaria estándar (ej. `formatCurrency(value, 'USD')`).
- Números negativos renderizados en rojo o con un indicador visual claro de pérdida.

## Criterios de Aceptación
- Ningún símbolo de moneda `$` o `%` debe estar hardcodeado en HTML/JSX.
- Se debe manejar internacionalización básica (locale + currency).
- Los colores semánticos (verde/rojo) deben aplicarse según el valor numérico.

## Guía de Implementación
1. Centralizar formateadores en utilidades compartidas.
2. Usar `Intl.NumberFormat` para moneda, porcentaje y valores compactos.
3. Evitar concatenar strings con símbolos financieros en componentes.
4. Exponer funciones con defaults seguros y parámetros opcionales:
   - `formatCurrency(value, currency, locale, options)`
   - `formatPercent(value, locale, options)`
   - `formatCompactCurrency(value, currency, locale, options)`
5. Aplicar clases semánticas en base al signo (`> 0`, `< 0`, `=== 0`) para ganancias/pérdidas.

## Reglas de Revisión
- Rechazar PR si hay `${value}%`, `$${value}`, `toFixed(...) + '%'` o equivalentes en JSX.
- Rechazar PR si un valor financiero no pasa por utilitaria estándar.
- Rechazar PR si valores negativos no tienen señal visual clara.

## Checklist Rápido
- [ ] ¿Todos los importes usan `formatCurrency`?
- [ ] ¿Todos los porcentajes usan `formatPercent`?
- [ ] ¿No hay `$` ni `%` hardcodeados en JSX?
- [ ] ¿Hay tratamiento visual de pérdidas?
- [ ] ¿Hay cobertura de tests de formateo?
