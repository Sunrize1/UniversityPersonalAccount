import { EducationEntry, Post } from '../types/api/studentEmployeeDataResponse';
import { TabInfoData } from '../types/components/common/CertificateOrderTypes';

export const mapEducationToTabInfo = (entry: EducationEntry): TabInfoData => ({
  id: entry.id,
  institute: entry.faculty.name,
  level: entry.educationLevel.name,
  status: entry.educationStatus.name,
  faculty: entry.faculty.name,
  direction: entry.educationDirection.name,
  group: entry.group.name
});

export const mapPostToTabInfo = (post: Post): TabInfoData => ({
  id: post.id,
  institute: post.departments.map(dep => dep.name).join(', '),
  level: post.postName.name,
  status: `Ставка: ${post.rate}`,
  faculty: post.departments.map(dep => dep.name).join(', '),
  direction: post.postType.name,
  group: post.employmentType
}); 