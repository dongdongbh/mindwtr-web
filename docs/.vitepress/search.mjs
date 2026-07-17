// Built-in VitePress local search (MiniSearch): fully client-side, no
// third-party search service, matching the app's local-first stance.
// Keys mirror DOCS_LOCALE_ORDER; root (English) uses the default strings.
export const localSearchOptions = {
  locales: {
    de: {
      translations: {
        button: { buttonText: "Suchen", buttonAriaLabel: "Suchen" },
        modal: {
          displayDetails: "Detailansicht anzeigen",
          resetButtonTitle: "Suche zurücksetzen",
          backButtonTitle: "Zurück",
          noResultsText: "Keine Ergebnisse für",
          footer: {
            selectText: "auswählen",
            navigateText: "navigieren",
            closeText: "schließen"
          }
        }
      }
    },
    es: {
      translations: {
        button: { buttonText: "Buscar", buttonAriaLabel: "Buscar" },
        modal: {
          displayDetails: "Mostrar lista detallada",
          resetButtonTitle: "Restablecer búsqueda",
          backButtonTitle: "Volver",
          noResultsText: "Sin resultados para",
          footer: {
            selectText: "seleccionar",
            navigateText: "navegar",
            closeText: "cerrar"
          }
        }
      }
    },
    fr: {
      translations: {
        button: { buttonText: "Rechercher", buttonAriaLabel: "Rechercher" },
        modal: {
          displayDetails: "Afficher la liste détaillée",
          resetButtonTitle: "Réinitialiser la recherche",
          backButtonTitle: "Retour",
          noResultsText: "Aucun résultat pour",
          footer: {
            selectText: "sélectionner",
            navigateText: "naviguer",
            closeText: "fermer"
          }
        }
      }
    },
    "zh-Hans": {
      translations: {
        button: { buttonText: "搜索", buttonAriaLabel: "搜索" },
        modal: {
          displayDetails: "显示详细列表",
          resetButtonTitle: "清除搜索条件",
          backButtonTitle: "返回",
          noResultsText: "未找到相关结果",
          footer: {
            selectText: "选择",
            navigateText: "切换",
            closeText: "关闭"
          }
        }
      }
    },
    "zh-Hant": {
      translations: {
        button: { buttonText: "搜尋", buttonAriaLabel: "搜尋" },
        modal: {
          displayDetails: "顯示詳細列表",
          resetButtonTitle: "清除搜尋條件",
          backButtonTitle: "返回",
          noResultsText: "找不到相關結果",
          footer: {
            selectText: "選擇",
            navigateText: "切換",
            closeText: "關閉"
          }
        }
      }
    }
  }
};
