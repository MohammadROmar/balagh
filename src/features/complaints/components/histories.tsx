import ComplaintDetailsContainer from './details-container';
import HistoryIcon from '@/assets/icons/history';
import type { History } from '../models/complaint';
import { TFunction } from '@/shared/models/tfunction';

type Props = { histories: History[]; t: TFunction<'complaintsPage.details'> };

function ComaplintHistory({ t, histories }: Props) {
  return (
    <ComplaintDetailsContainer title={t('history')} icon={HistoryIcon}>
      <ul>
        {histories.map((history, i) => {
          const isAddAction = history.changeType.includes('Add');

          return (
            <li
              key={`history-${history.id}-${i}`}
              className="grid grid-cols-[auto_1fr] gap-4"
            >
              <div aria-hidden className="flex flex-col items-center">
                <div className="bg-emerald-green size-5 shrink-0 rounded-full" />
                {i !== histories.length - 1 && (
                  <div className="bg-primary-background h-full w-1" />
                )}
              </div>
              <div className="space-y-2 pb-2">
                <h4 className="text-heading font-medium">
                  <span className="text-emerald-green">
                    {history.userName}{' '}
                  </span>
                  <span>
                    {t('performed')} {history.changeType}
                  </span>
                </h4>

                <p className="bg-primary-background space-x-1 rounded-2xl p-4 text-sm">
                  {isAddAction ? (
                    <span>{t('withValue')}</span>
                  ) : (
                    <>
                      <span>{t('update')}</span>
                      <span className="bg-warning-bg text-warning rounded-lg px-1 leading-none">
                        {history.oldValue}
                      </span>
                      <span>{t('to')}</span>
                    </>
                  )}
                  <span className="bg-success-bg text-success rounded-lg px-1 leading-none">
                    {history.newValue}
                  </span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </ComplaintDetailsContainer>
  );
}

export default ComaplintHistory;
