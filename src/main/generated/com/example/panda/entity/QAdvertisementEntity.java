package com.example.panda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAdvertisementEntity is a Querydsl query type for AdvertisementEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAdvertisementEntity extends EntityPathBase<AdvertisementEntity> {

    private static final long serialVersionUID = 1451587074L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAdvertisementEntity advertisementEntity = new QAdvertisementEntity("advertisementEntity");

    public final NumberPath<Integer> ad_price = createNumber("ad_price", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> ad_regitDate = createDateTime("ad_regitDate", java.time.LocalDateTime.class);

    public final NumberPath<Integer> aid = createNumber("aid", Integer.class);

    public final QWritingEntity writingEntity;

    public QAdvertisementEntity(String variable) {
        this(AdvertisementEntity.class, forVariable(variable), INITS);
    }

    public QAdvertisementEntity(Path<? extends AdvertisementEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAdvertisementEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAdvertisementEntity(PathMetadata metadata, PathInits inits) {
        this(AdvertisementEntity.class, metadata, inits);
    }

    public QAdvertisementEntity(Class<? extends AdvertisementEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.writingEntity = inits.isInitialized("writingEntity") ? new QWritingEntity(forProperty("writingEntity"), inits.get("writingEntity")) : null;
    }

}

