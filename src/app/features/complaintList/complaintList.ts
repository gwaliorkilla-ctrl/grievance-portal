import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ComplaintService } from '../../core/services/complaintService';
import { Complaint, ComplaintFilters } from '../../shared/models/complaint.type';

@Component({
  selector: 'app-complaint-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './complaintList.html',
  styleUrl: './complaintList.css'
})
export class ComplaintListComponent implements OnInit {
  private service = inject(ComplaintService);
  private fb = inject(FormBuilder);

  complaints = signal<Complaint[]>([]);
  loading = signal<boolean>(false);
  deletingId = signal<string | null>(null);
  currentPage = signal<number>(1);
  totalPages = signal<number>(1);
  totalRecords = signal<number>(0);

  filterForm = this.fb.group({
    fromDate: [''],
    toDate: [''],
    type: ['']
  });

  ngOnInit() {
    this.loadComplaints();
  }

  loadComplaints() {
    this.loading.set(true);
    const formValues = this.filterForm.value;

    const filters: ComplaintFilters = {
      page: this.currentPage(),
      limit: 10,
      fromDate: formValues.fromDate || undefined,
      toDate: formValues.toDate || undefined,
      type: formValues.type || undefined
    };

    this.service.getComplaints(filters).subscribe({
      next: (res) => {
        this.complaints.set(res.data);
        this.currentPage.set(res.pagination.currentPage);
        this.totalPages.set(res.pagination.totalPages);
        this.totalRecords.set(res.pagination.totalRecords);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  applyFilters() {
    this.currentPage.set(1);
    this.loadComplaints();
  }

  resetFilters() {
    this.filterForm.reset({ fromDate: '', toDate: '', type: '' });
    this.applyFilters();
  }

  changePage(page: number) {
    this.currentPage.set(page);
    this.loadComplaints();
  }

  resolveComplaint(id: string, event: Event) {
    event.stopPropagation();
    if (confirm('Are you sure you want to resolve and delete this complaint record?')) {
      this.deletingId.set(id);
      this.service.deleteComplaint(id).subscribe({
        next: () => {
          this.complaints.update(list => list.filter(item => item.id !== id));
          this.totalRecords.update(count => count - 1);
          this.deletingId.set(null);
        },
        error: () => {
          alert('Failed to resolve complaint. Please try again.');
          this.deletingId.set(null);
        }
      });
    }
  }
}