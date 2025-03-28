import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from '../UserProfileSettings.module.css';

/**
 * DeleteUser component displays a card with a button to delete a user.
 * It includes a message and a button to trigger the delete action.
 *
 * @returns The JSX element for the delete user card.
 */
const DeleteUser: React.FC = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings',
  });
  return (
    <>
      <Card border="0" className="rounded-4 mb-4">
        <div className={styles.cardHeader}>
          <div className={styles.cardTitle}>{t('deleteUser')}</div>
        </div>
        <Card.Body className={styles.cardBody}>
          <p style={{ margin: '1rem 0' }}>{t('deleteUserMessage')}</p>
          <Button variant="danger">{t('deleteUser')}</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default DeleteUser;
