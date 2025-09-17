import type { Metadata } from 'next';
import css from './ProfilePage.module.css';
import { getServerMe } from '@/lib/api/serverApi';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'View and edit your user profile on NoteHub.',
  openGraph: {
    title: 'Profile | NoteHub',
    description: 'Manage your account and personal information.',
    url: '/profile',
    type: 'profile',
  },
  alternates: {
    canonical: '/profile',
  },
};

export default async function Profile() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar ?? '/default-avatar.jpg'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}