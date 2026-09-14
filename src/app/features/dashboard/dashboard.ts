import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ComplaintService } from '../../core/services/complaintService';
import { Complaint } from '../../shared/models/complaint.type';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  private service = inject(ComplaintService);

  complaints = signal<Complaint[]>([]);
  totalCount = signal<number>(0);

  serviceCount = computed(() => this.complaints().filter(c => c.complaint_type === 'Service').length);
  otherCount = computed(() => this.complaints().filter(c => c.complaint_type !== 'Service').length);
  recentComplaints = computed(() => this.complaints().slice(0, 5));

  ngOnInit() {
    this.service.getComplaints({ page: 1, limit: 100 }).subscribe(res => {
      this.complaints.set(res.data);
      this.totalCount.set(res.pagination.totalRecords);
    });
  }
}