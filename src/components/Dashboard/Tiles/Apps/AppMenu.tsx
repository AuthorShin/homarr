import { useConfigContext } from '~/config/provider';
import { useConfigStore } from '~/config/store';
import { openContextModalGeneric } from '~/tools/mantineModalManagerExtensions';
import { AppType } from '~/types/app';
import { GenericTileMenu } from '../GenericTileMenu';

interface TileMenuProps {
  app: AppType;
}

export const AppMenu = ({ app }: TileMenuProps) => {
  const { config, name: configName } = useConfigContext();
  const { updateConfig } = useConfigStore();

  const handleClickEdit = () => {
    openContextModalGeneric<{ app: AppType; allowAppNamePropagation: boolean }>({
      modal: 'editApp',
      size: 'xl',
      innerProps: {
        app,
        allowAppNamePropagation: false,
      },
      styles: {
        root: {
          zIndex: 201,
        },
      },
    });
  };

  const handleClickChangePosition = () => {
    openContextModalGeneric({
      modal: 'changeAppPositionModal',
      innerProps: {
        app,
      },
      styles: {
        root: {
          zIndex: 201,
        },
      },
    });
  };

  const handleClickDelete = () => {
    if (configName === undefined) {
      return;
    }

    updateConfig(configName, (previousConfig) => ({
      ...previousConfig,
      apps: previousConfig.apps.filter((a) => a.id !== app.id),
    }));
  };

  return (
    <GenericTileMenu
      handleClickEdit={handleClickEdit}
      handleClickChangePosition={handleClickChangePosition}
      handleClickDelete={handleClickDelete}
      displayEdit
    />
  );
};
